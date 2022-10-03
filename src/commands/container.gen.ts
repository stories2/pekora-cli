import chalk from "chalk";
import fs from "fs";

export function runner(source: string[], output: string) {
  console.log(
    chalk.bgYellow("Generate Container"),
    chalk.bgBlue("Source: ", source),
    chalk.bgGreen("Output: ", output)
  );

  const classMapper = {};

  // /\/\/@Autowired\n+class\s(\w*)\s?/g

  source.forEach((path) => {
    const data = fs.readFileSync(path).toString();
    const detectedClassAndParamList = [
      ...data.matchAll(
        /\/\/@Autowired\n+class\s(\w*)\s\{\.*([\w\s\n\*\/\@\{}]*\/?)constructor/g
      ),
    ].map((item) => {
      return {
        className: item[1],
        param: [...item[2].matchAll(/@param\s*\{(\w*)\}\s*\w*/g)].map(
          (paramParsed) => paramParsed[1]
        ),
      };
    });

    // console.log(path, ":", detectedClassList);
    detectedClassAndParamList.forEach((classNameAndParam) => {
      const { className, param } = classNameAndParam;

      console.log(className, param);
      if (classMapper.hasOwnProperty(className)) {
        throw new Error(`Already exist class name ${className} / ${path}`);
      } else {
        classMapper[className] = {
          path,
          param,
        };
      }
    });
  });
  console.log("classmapper", classMapper);
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
    classMapper[className].param.forEach((dependencyClassName) => {
      result += `\n .addArgument(${prefix}${dependencyClassName})`;
    });
    result += ";";
  });

  result += `\ncontainer.compile();\nmodule.exports = { container };`;
  console.log("result", result);

  fs.writeFileSync(output, result, { encoding: "utf8", flag: "w" });
}
