import inquirer from "inquirer";
let numberOfGuesses = 5;
console.log(`Guess a number between 1 to 10. You've got ${numberOfGuesses} chances to guess the number right!`);
//Generating a random number between 1 - 10
const randomNumber = Math.floor(Math.random() * 10) + 1;
while (numberOfGuesses > 0) {
    //Taking user input
    let guessNumber = await inquirer.prompt({
        type: 'number',
        name: 'num',
        message: 'Guess a number?'
    });
    if (randomNumber == guessNumber.num) {
        console.log(`Congratulations! You guessed it right👍`);
        break;
    }
    else if (guessNumber.num > randomNumber) {
        --numberOfGuesses;
        if (numberOfGuesses <= 0) {
            console.log(`Sorry your chances are over!`);
        }
        else {
            console.log(`Wrong! Try a smaller number`);
        }
    }
    else if (guessNumber.num < randomNumber) {
        --numberOfGuesses;
        if (numberOfGuesses <= 0) {
            console.log(`Sorry your chances are over!`);
        }
        else {
            console.log(`Oops! Wrong guess. Try a greater number`);
        }
    }
}
