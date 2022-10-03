import chalk from "chalk";
import fs from "fs";

function methodExtractor(body: string) {
  return [
    ...body.matchAll(/\/\/@frontline\n\s*(?:async\s)?([\w]*)\(([\w\s\,]*)\)/g),
  ].map((item) => {
    return {
      method: item[1],
      args: [...item[2].matchAll(/([\w]+)[\,\s]*/g)].map((arg) => arg[1]),
    };
  });
}

export function runner(
  source: string[],
  distDiContainer: string,
  distFrontline: string
) {
  console.log(
    chalk.bgYellow("Generate Frontline"),
    chalk.bgBlue("Source: ", source),
    chalk.bgGreen("Output: ", distDiContainer, distFrontline)
  );

  const frontlineMethods = [
    ...`//@frontline
  foo(a, b2_, c) {
  asdfasf
      bar(asdfas)
  }
  
  //@frontline
  asdf() {
  }
  
  //@frontline
  fdsa(a){ }
  
  func(a, b, c) {
  }
  
  func2() {
  }
  
  func3(a){ }`.matchAll(/\/\/@frontline\n\s*([\w]*)\(([\w\s\,]*)\)/g),
  ].map((item) => {
    return {
      method: item[1],
      args: [...item[2].matchAll(/([\w]+)[\,\s]*/g)].map((arg) => arg[1]),
    };
  });
  // console.log(frontlineMethods);

  const classMapper = {};

  // /\/\/@Autowired\n+class\s(\w*)\s?/g

  source.forEach((path) => {
    // console.log(`---${path}---`);
    const data = fs.readFileSync(path).toString();
    const detectedList = [
      ...data.matchAll(
        /\/\/@Autowired\n+class\s*(\w*)\s*(?:[extends\s\w\s]*)?\s*\{\.*([\w\s\n\*\/\@\{}]*\/?)constructor((?:(?!module\.exports|class|\/\/@Autowired).|\n)*)/g
      ),
    ].map((item) => {
      return {
        className: item[1],
        params: [...item[2].matchAll(/@param\s*\{(\w*)\}\s*\w*/g)].map(
          (paramParsed) => paramParsed[1]
        ),
        methods: methodExtractor(item[3]),
      };
    });
    // console.log("detectedList", detectedList);

    detectedList.forEach((classObj) => {
      const { className, params, methods } = classObj;

      if (classMapper.hasOwnProperty(className)) {
        throw new Error(`Already exist class name ${className} / ${path}`);
      } else {
        classMapper[className] = {
          path,
          params,
          methods,
        };
      }
    });
  });

  console.log("---mapper---\n", JSON.stringify(classMapper));
  // generate di.container.js
  const prefix = "__";

  let result = `const { ContainerBuilder, Reference } = require('node-dependency-injection');
const container = new ContainerBuilder();`;
  // require
  Object.keys(classMapper).forEach((className) => {
    result += `\nconst { ${className} } = require('${classMapper[
      className
    ].path.replace(/\.[^/.]+$/, "")}');`;
  });
  // ref
  Object.keys(classMapper).forEach((className) => {
    result += `\nconst ${prefix}${className} = new Reference('${prefix}${className}');`;
  });
  // register
  Object.keys(classMapper).forEach((className) => {
    result += `\ncontainer.register('${prefix}${className}', ${className})`;
    classMapper[className].params.forEach((dependencyClassName) => {
      result += `\n .addArgument(${prefix}${dependencyClassName})`;
    });
    result += ";";
  });

  result += `\ncontainer.compile();\nmodule.exports = { container };`;
  console.log("---container---\n", result);

  fs.writeFileSync(distDiContainer, result, { encoding: "utf8", flag: "w" });

  // generate frontline

  let frontlineResult = "";
  // linking
  const methodList = [];
  Object.keys(classMapper).forEach((className) => {
    const methods = classMapper[className].methods;
    methods.forEach((methodObj) => {
      methodList.push(methodObj.method);
      frontlineResult += `const ${methodObj.method} = (${methodObj.args.join(
        ", "
      )}) => container.get('${prefix}${className}').${
        methodObj.method
      }(${methodObj.args.join(", ")});\n`;
    });
  });
  // exports
  frontlineResult += `module.exports = {${methodList.join(", ")}};`;

  console.log("---frontline---\n", frontlineResult);
  fs.writeFileSync(distFrontline, frontlineResult, {
    encoding: "utf8",
    flag: "w",
  });

  console.log("---done---\nHA↗HA↗HA↗HA↗🥕🥕🥕\n");
}
