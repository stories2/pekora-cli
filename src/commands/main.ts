import { sourceLoader } from "./loader";
import { parseCode, ParsedClass } from './parser';

type ParsedCode = {
    path: string;
    code: string;
    parsed: ParsedClass[];
}

export function runner(
    source: string[],
    distDiContainer: string,
    distFrontline: string
  ) {
    const codeList = sourceLoader(source);
    const parsedCodeList = codeList.map(codeInfo => {
        return {
            ...codeInfo,
            parsed: parseCode(codeInfo.path, codeInfo.code)
        }
    });
    
};

function generateFrontline() {

}

function generateContainer(parsedCodeList: ParsedCode[]) {
    
}