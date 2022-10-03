import chalk from "chalk";

export function runner(source: string[], output: string) {
  console.log(
    chalk.bgYellow("Generate Container"),
    chalk.bgBlue("Source: ", source),
    chalk.bgGreen("Output: ", output)
  );
}
