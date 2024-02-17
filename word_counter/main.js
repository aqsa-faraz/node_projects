import inquirer from "inquirer";
import chalk from "chalk";
function counter2(text) {
    let totalWords = 0;
    let totalCharacters = 0;
    let words = text.trim().split(' ');
    console.log(words);
    for (let i = 0; i < words.length; i++) {
        totalWords++;
        for (let j = 0; j < words[i].length; j++) {
            totalCharacters++;
        }
    }
    console.log(`There are ${chalk.bold.italic.green(totalWords)} words and ${chalk.bold.italic.green(totalCharacters)} characters in the above paragraph.`);
}
function counter(text) {
    let totalWords = 0, totalCharacters = 0;
    let temp = text;
    for (let i = 0; i < temp.length; i++) {
        if (temp.charAt(i) === ' ') {
            totalWords++;
        }
        else {
            totalCharacters++;
            if (i === temp.length - 1) {
                totalWords++;
            }
        }
    }
    console.log(`There are ${chalk.bold.italic.green(totalWords)} words and ${chalk.bold.italic.green(totalCharacters)} characters in the above paragraph.`);
}
async function wordCOunter(counter) {
    let paragraph = await inquirer.prompt({
        type: "input",
        name: "text",
        message: chalk.bold.blue(`Enter a paragraph to count the number of words and characters: `)
    });
    counter(paragraph.text);
}
wordCOunter(counter);
//wordCOunter(counter2);
