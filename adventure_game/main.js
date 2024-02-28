import inquirer from "inquirer";
import chalk from "chalk";
//Game variables
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
//Player Variables
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; // percentage
let running = true;
console.log(chalk.italic.red("Welcome to the Dungeon"));
GAME: while (running) {
    console.log("------------------------------------------");
    let enemyHealth = Math.floor(Math.random() * 75);
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    console.log(`\t# ${enemy} has appeared! #\n`);
    while (enemyHealth > 0) {
        console.log(`\t Your HP: ${health}`);
        console.log(`\t ${enemy}\'s HP: ${enemyHealth}`);
        //taking input from user
        let userInput = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: ["Attack", "Drink health potion", "Run!"]
        });
        if (userInput.option === "Attack") {
            let damageDealt = Math.floor(Math.random() * attackDamage);
            let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
            enemyHealth -= damageDealt;
            health -= damageTaken;
            console.log(`\t> You strike the enemy ${enemy} for ${damageDealt} damage.`);
            console.log(`\t> You receive ${damageTaken} in retaliation!`);
            if (health < 1) {
                console.log(`\t> You have taken too much damage, you are too weak to go on!`);
                break;
            }
        }
        else if (userInput.option === "Drink health potion") {
            if (numHealthPotions > 0) {
                health += healthPotionHealAmount;
                numHealthPotions--;
                console.log(`\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}.\n\t> You now have ${health} HP.\n\t> You have ${numHealthPotions} health potions left.`);
            }
            else {
                console.log(`\t> You have no health potions left! Defaet enemies for a chance to get one!`);
            }
        }
        else if (userInput.option === "Run!") {
            console.log(`\t> You run away from the ${enemy}!`);
            continue GAME;
        }
        else {
            console.log("\t> Invalid command!");
        }
    }
    if (health < 1) {
        console.log(chalk.italic.red(`You limp out of the dungeon, weak from battle.`));
        break;
    }
    console.log("------------------------------------------");
    console.log(`\t# ${enemy} was defeated! #`);
    console.log(`\t# You have ${health} HP left. #`);
    if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`\t# The ${enemy} dropped a health potion! #`);
        console.log(`\t# You now have ${numHealthPotions} health potion(s). #`);
    }
    console.log("------------------------------------------");
    //taking input from user
    let continueGame = await inquirer.prompt({
        type: "list",
        name: "options",
        message: "What would you like to do now?",
        choices: ["Continue fighting", "Exit dungeon"]
    });
    if (continueGame.options === "Continue fighting") {
        console.log(`You continue on your adventure!`);
    }
    else if (continueGame.options === "Exit dungeon") {
        console.log(chalk.bold.italic.green(`You exit the dungeon, successful from your adventures!`));
        break;
    }
}
console.log(chalk.bold.blue(`######################`));
console.log(chalk.bold.blue(`# THANKS FOR PLAYING #`));
console.log(chalk.bold.blue(`######################`));
