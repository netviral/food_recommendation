const fs = require("fs");
const csv = require("csv-parser");
const chalk = require("chalk");
const prompt = require("prompt-sync")(); 
const menuData = require("./inputs/dhaba_menu.json"); 
const menuMapping = {};
const nameToIdMapping = {};
Object.keys(menuData).forEach((dishName) => {
  const dish = menuData[dishName];
  menuMapping[dish.id] = dish.item;
  nameToIdMapping[dishName.toLowerCase()] = dish.id; 
});
const edges = [];
fs.createReadStream("./outputs/network_graph.csv")
  .pipe(csv())
  .on("data", (row) => {
    const source = parseInt(row.source, 10);
    const target = parseInt(row.target, 10);
    const weight = parseInt(row.weight, 10);
    edges.push({ source, target, weight });
  })
  .on("end", () => {
    console.log(chalk.green.bold("\nWelcome to the Food Recommendation System!"));
    console.log(chalk.yellow("Type the name of the dish to get recommendations, or type 'exit' to quit.\n"));
    while (true) {
      processInput();
    }
  });
function processInput() {
  try {
    const input = prompt(chalk.blueBright("Enter the name of the dish: ")).trim().toLowerCase();
    if (input === "exit") {
      console.log(chalk.bold.red("\nExiting interactive shell. Goodbye!\n"));
      process.exit();
    }
    if (!nameToIdMapping[input]) {
      console.log(chalk.redBright(`\nDish '${input}' not found in the menu. Please try again.\n`));
      return;
    }
    const inputId = nameToIdMapping[input];
    const connections = {};
    edges.forEach(({ source, target, weight }) => {
      if (source === inputId || target === inputId) {
        const connectedId = source === inputId ? target : source;
        if (!connections[connectedId]) {
          connections[connectedId] = 0;
        }
        connections[connectedId] += weight;
      }
    });
    if (Object.keys(connections).length === 0) {
      console.log(chalk.redBright(`\nNo recommendations found for the dish '${menuMapping[inputId]}'.\n`));
      return;
    }
    const maxConnectionId = Object.keys(connections).reduce((a, b) =>
      connections[a] > connections[b] ? a : b
    );
    const recommendedDish = menuMapping[maxConnectionId];
    const connectionWeight = connections[maxConnectionId];
    if (recommendedDish) {
      console.log(
        chalk.greenBright(`\nThe dish closest in preference and taste to '${menuMapping[inputId]}' (ID: ${inputId}) is:`)
      );
      console.log(chalk.bold.yellow(`"${recommendedDish}" (ID: ${maxConnectionId})`));
      console.log(
        chalk.cyanBright(`This recommendation is based on ${connectionWeight} user(s) liking both dishes.\n`)
      );
    } else {
      console.log(chalk.redBright(`\nNo recommendations found for the dish '${menuMapping[inputId]}'.\n`));
    }
  } catch (error) {
    console.log(chalk.red(`\nAn error occurred: ${error.message}\n`));
  }
}
