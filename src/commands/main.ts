import { sourceLoader } from "./loader";
import { parseCode, ParsedClass } from './parser';
import { generateContainer } from './container.gen';
import { generateFrontline } from './frontline.gen';
import fs from "fs";

export type ParsedCode = {
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
    const containerResult = generateContainer(parsedCodeList);
    fs.writeFileSync(distDiContainer, containerResult, { encoding: "utf8", flag: "w" });
    const frontlineResult = generateFrontline(parsedCodeList);
    fs.writeFileSync(distFrontline, frontlineResult, {
        encoding: "utf8",
        flag: "w",
      });
    console.log("---done---\nHA↗HA↗HA↗HA↗🥕🥕🥕\n");
};
