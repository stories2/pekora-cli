import fs from "fs";

type SourceInfo = {
    path: string;
    code: string;
}

export function sourceLoader(sourcePaths: string[]): SourceInfo[] {
    return sourcePaths.map(path => {
        return {
            path,
            code: fs.readFileSync(path).toString()
        }
    });
}