import { ParsedCode } from './main';

function writeRequire(parsedCodeList: ParsedCode[]): string[] {
  const result: string[] = [];
  parsedCodeList.forEach(parsedCode => {
      const classNameJoined = parsedCode.parsed.filter(parsed => parsed.isAutowired).map(parsed => parsed.name).join(', ')
      result.push(`const { ${classNameJoined} } = require('${parsedCode.path}')`)
  })
  return result;
}

function writeReference(parsedCodeList: ParsedCode[], prefix: string = '__'): string[] {
  const result: string[] = [];
  parsedCodeList.forEach(parsedCode => {
      parsedCode.parsed.filter(parsed => parsed.isAutowired).forEach(parsed => {
          result.push(`const ${prefix}${parsed.name} = new Reference('${prefix}${parsed.name}')`)
      })
  })
  return result;
}

function writeRegister(parsedCodeList: ParsedCode[], prefix: string = '__'): string[] {
  const result: string[] = [];
  parsedCodeList.forEach(parsedCode => {
      parsedCode.parsed.filter(parsed => parsed.isAutowired).forEach(parsed => {
          result.push(`container.register('${prefix}${parsed.name}', ${parsed.name})`)
          const constructorList = parsed.methods.filter(method => method.kind === 'constructor')
          if (constructorList.length > 0) {
              constructorList[0].dependency.forEach(dependency => {
                  result.push(`    .addArgument(${prefix}${dependency.class})`)
              })
          }
      })
  })
  return result;
}

export function generateContainer(parsedCodeList: ParsedCode[]): string {
  const header = `
/* eslint-disable */
const { ContainerBuilder, Reference } = require('node-dependency-injection');
const container = new ContainerBuilder();
  `;
  const requireResults = writeRequire(parsedCodeList);
  // console.log('require\n', requireResults);
  const referenceResults = writeReference(parsedCodeList);
  // console.log('ref\n', referenceResults);
  const registerResults = writeRegister(parsedCodeList);
  // console.log('reg\n', registerResults);

  const footer = `
container.compile();
module.exports = { container };
  `;

  let content = `
${header}\n
${requireResults.join('\n')}\n
${referenceResults.join('\n')}\n
${registerResults.join('\n')}\n
${footer}
`
  return content;
}