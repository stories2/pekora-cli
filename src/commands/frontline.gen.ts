import chalk from "chalk";

export function runner(source: string[], output: string) {
  console.log(
    chalk.bgYellow("Generate Frontline"),
    chalk.bgBlue("Source: ", source),
    chalk.bgGreen("Output: ", output)
  );

  const frontlineMethods = [
    ...`//@frontline
  foo(a, b, c) {
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
  
  func3(a){ }`.matchAll(/\/\/@frontline+\n(?:[a-zA-Z]+\([^)]*\))/gs),
  ].map((item) => item[0]);
  console.log(frontlineMethods);
}
