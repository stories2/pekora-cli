#!/usr/bin/env node

import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
// import "figlet/fonts/Standard.flf";
import { program } from "commander";
import { runner } from './commands/main';
import { parseCode } from './commands/parser';
// import { runner as ContainerRunner } from "./commands/container.gen";
// import { runner as FrontlineRunner } from "./commands/frontline.gen";
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
    `CLI for auto generate di.container.js and frontline.ts

---Example---

- Generate di.container.js and frontline.js
peko -od ./sample/di.container.js -of ./sample/frontline.ts -s ./sample/**/*.js ./sample/test.js
`
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
// console.log("options", options, "asfda", program.args);

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

runner(options.source, options.outputDi, options.outputFrontline);
// FrontlineRunner();
// parseCode('inline code', 
//   `//@Autowired
//   class Index extends A {
//     /**
//      * @param {Index1Controller} index1Controller
//      * @param {Index2Controller} index2Controller
//      */
//     constructor(index1Controller, index2Controller) {
//       this.index1Controller = index1Controller;
//       this.index2Controller = index2Controller;
//     }
  
//     //@frontline
//     async createFoo(req, res, next) {
//       console.log("asdf");
//     }
  
//     createBar(req, res, next) {
//       console.log("fadsf");
//     }
  
//     //@frontline
//     updateFoo(req) {
//       console.log("afaf");
//     }
  
//     updateBar(req) {
//       console.log("ASdf");
//     }
  
//     //@frontline
//     selectFoo() {
//       console.log("afsdaf");
//     }
  
//     selectBar() {
//       console.log("fasfa");
//     }
  
//     //@frontline
//     deleteFoo(req1, res2) {
//       console.log("asdf");
//     }
  
//     deleteFoo(req1, res2) {
//       console.log("asdfsad");
//     }

//     //@frontline
//     under_bar_Foo(req1, res2) {
//       console.log("asdf");
//     }
  
//     under_bar_Foo(req1, res2) {
//       console.log("asdfsad");
//     }

//     //@frontline
//     defaultFoo(req1, res2 = false) {
//       console.log("asdf");
//     }
  
//     defaultFoo(req1, res2 = false) {
//       console.log("asdfsad");
//     }
//   }
  
//   module.exports = { Index };
//   `
// )

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
