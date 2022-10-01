#!/usr/bin/env node

import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
import { program } from "commander";

clear();
console.log(
  chalk.red(figlet.textSync("pekora-cli", { horizontalLayout: "full" }))
);
program
  .version(process.env.npm_package_version || "-.-.-")
  .description("CLI for automatic ")
  .option("-p, --peppers", "Add peppers")
  .option("-P, --pineapple", "Add pineapple")
  .option("-b, --bbq", "Add bbq sauce")
  .option("-c, --cheese <type>", "Add the specified type of cheese [marble]")
  .option("-C, --no-cheese", "You do not want any cheese")
  .parse(process.argv);

program.outputHelp();
const options = program.opts();
console.log("options", options, "asfda", program.args);

// console.log("you ordered a pizza with:");
// if (options.peppers) console.log("  - peppers");
// if (options.pineapple) console.log("  - pineapple");
// if (options.bbq) console.log("  - bbq");

// const cheese: string =
//   undefined === options.cheese ? "marble" : options.cheese || "no";

// console.log("  - %s cheese", cheese);

// if (!process.argv.slice(2).length) {
//   program.outputHelp();
// }
