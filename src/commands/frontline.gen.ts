import chalk from "chalk";
import fs from "fs";

function methodExtractor(body: string) {
  return [
    ...body.matchAll(/\/\/@frontline\n\s*(?:async\s)?([\w]*)\s*\(([\w\s\,]*)\)/g),
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

  source.forEach((path) => {
    // console.log(`---${path}---`);
    const data = fs.readFileSync(path).toString();

  let result = `/* eslint-disable */
const { ContainerBuilder, Reference } = require('node-dependency-injection');
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

  let frontlineResult = "/* eslint-disable */\ndeclare const container;\n";
  Object.keys(classMapper).forEach((className) => {
    frontlineResult += `import { ${className} } from "${classMapper[
      className
    ].path.replace(/\.[^/.]+$/, "")}";\n`;
  })
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
      }(${methodObj.args.join(", ")}) as ${className}["${methodObj.method}"];\n`;
    });
  });
  // exports
  frontlineResult += `export {${methodList.join(", ")}};`;

  console.log("---frontline---\n", frontlineResult);
  fs.writeFileSync(distFrontline, frontlineResult, {
    encoding: "utf8",
    flag: "w",
  });

  console.log("---done---\nHA↗HA↗HA↗HA↗🥕🥕🥕\n");
}
