import inquirer from "inquirer";
let currentIdx = 0;

const supportCommands = [
  [
    {
      name: "pekopeko",
      message: "Select what you want",
      type: "list",
      choices: ["Auto generate frontline.js", "Auto generate di.container.js"],
    },
  ],
];

module.exports = function runner() {
  inquirer
    .prompt(supportCommands[currentIdx])
    .then((answers) => {
      console.info("Answer:", answers.faveReptile);
    })
    .catch((err) => {});
};
