import { ParsedParam } from './parser';
import { ParsedCode } from './main';

function writeImport(parsedCodeList: ParsedCode[]): string[] {
    const result: string[] = [];
    parsedCodeList.forEach(parsedCode => {
        const classNameJoined = parsedCode.parsed.filter(parsed => parsed.isAutowired).map(parsed => parsed.name).join(', ')
        result.push(`import { ${classNameJoined} } from "${parsedCode.path}"`)
    })
    return result;
}

function getParams(params: ParsedParam[], includeDefaultVal: boolean = false): string {
    if (!includeDefaultVal)
        return params.map(val => val.name).join(', ');
    else
        return params.map(val => {
            return val.default ? `${val.name} = ${val.default}` : `${val.name}`
        }).join(', ');
}

function writeMethod(parsedCodeList: ParsedCode[], prefix: string = '__'): string [] {
    const result: string[] = [];
    parsedCodeList.forEach(parsedCode => {
        parsedCode.parsed.filter(parsed => parsed.isAutowired).forEach(classCode => {
            const className = classCode.name;
            classCode.methods.filter(method => method.kind === 'method' && method.isFrontline).forEach(method => {
                result.push(`const ${method.name} = (${getParams(method.params, true)}) => container.get(${prefix}${className}).${method.name}(${getParams(method.params)}) as ${className}["${method.name}"]`)
            })
        })
    })
    return result;
}

function getMethods(parsedCodeList: ParsedCode[]): string[] {
    const result: string[] = [];
    parsedCodeList.forEach(parsedCode => {
        parsedCode.parsed.filter(parsed => parsed.isAutowired).forEach(classCode => {
            classCode.methods.filter(method => method.kind === 'method' && method.isFrontline).forEach(method => {
                result.push(method.name);
            })
        })
    })
    return result;
}

export function generateFrontline(parsedCodeList: ParsedCode[]) {
    const header = `
/* eslint-disable */
declare const container;
`
    const importResults = writeImport(parsedCodeList);
    const methodResults = writeMethod(parsedCodeList);
    const methodList = getMethods(parsedCodeList);
    const footer = `
export {${methodList.join(', ')}};
`
    const content = `
${header}\n
${importResults.join('\n')}\n
${methodResults.join('\n')}\n
${footer}\n
`
    return content;
}