import inquirer from "inquirer";
import chalk from "chalk";

const apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";

let fetchData = async (data: string)=>{
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};

let data = await fetchData(apiLink);

let startQuiz = async()=>{
    let score = 0;

    let u_name = await inquirer.prompt({
        type: "input",
        name: "username",
        message: "Enter your name: "
    });

    for(let i = 0; i<5; i++){
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];

        let ans = await inquirer.prompt({
            type:"list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map(val=>val)
        });

        if(ans.quiz===data[i].correct_answer){
            score++;
            console.log(`${chalk.bold.italic.green("correct")}`)
        }else{
            console.log(`correct answer is ${chalk.bold.italic.green(data[i].correct_answer)}`)
        }

    }

    console.log(`Hey ${chalk.bold.italic.blue(u_name.username)}, your score is ${chalk.italic.red(score)} out of ${chalk.italic.red(5)}`);
}

startQuiz();