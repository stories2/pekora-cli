#!/usr/bin/env node

import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
// import "figlet/fonts/Standard.flf";
import { program } from "commander";
import { runner as ContainerRunner } from "./commands/container.gen";
import { runner as FrontlineRunner } from "./commands/frontline.gen";
// import inquirer from "inquirer";
import { createLogger, format, transports } from "winston";
// const logger = createLogger({
//   level: "debug",
//   format: format.json(),
//   transports: [
//     //
//     // - Write all logs with importance level of `error` or less to `error.log`
//     // - Write all logs with importance level of `info` or less to `combined.log`
//     new transports.Console({
//       format: format.simple(),
//     }),
//   ],
// });

clear();
console.log(
  chalk.red(figlet.textSync("pekora-cli", { horizontalLayout: "full" }))
);
program
  .version(process.env.npm_package_version || "-.-.-")
  .description(
    `CLI for auto generate di.container.js or frontline.js

---Example---

- Generate di.container.js
peko -g container -o ./sample/di.container.js -s ./sample/**/*.js ./sample/test.js

- Generate frontline.js
peko -g frontline -o ./sample/di.container.js -s ./sample/**/*.js`
  )
  .requiredOption(
    "-od, --output-di <string>",
    "Output path of di container (overwrite). ex) /path/to/filename.js"
  )
  .requiredOption(
    "-of, --output-frontline <string>",
    "Output path of frontline (overwrite). ex) /path/to/filename.js"
  )
  .requiredOption(
    "-s, --source <strings...>",
    "Directory of source. ex) /path/**/*.js /other/path/*.js"
  )
  .parse(process.argv);
//   program
//   .option('-n, --number <numbers...>', 'specify numbers')
//   .option('-l, --letter [letters...]', 'specify letters');

program.outputHelp();
const options = program.opts();
console.log("options", options, "asfda", program.args);

// switch (options.generate) {
//   case "container":
//     ContainerRunner(options.source, options.output);
//     break;
//   case "frontline":
//     FrontlineRunner(options.source, options.output);
//     break;
//   default:
//     console.log(chalk.red.bold("Unknown generate option detected."));
//     break;
// }

FrontlineRunner(options.source, options.outputDi, options.outputFrontline);

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
