import chalk from "chalk";
import { Student } from "./student.js";
import inquirer from "inquirer";

// Ask how many students we want to add

let user_input = await inquirer.prompt({
    type: "number",
    name: "noOfStudents",
    message: "Enter number of new students to enroll: "
});
let numOfStudents = user_input.noOfStudents; 
const students: Student[] = [];


// Create n number of new students
for(let i = 0; i < numOfStudents; i++){
    let f_name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "Enter first name: "
    });
    let last_name = await inquirer.prompt({
        type: "input",
        name: "lname",
        message: "Enter last name: "
    });
    students[i]= new Student(f_name.fname, last_name.lname, await askGrade());
    await students[i].enroll();
    await students[i].payTuition();
    //console.log(students[i].showInfo());
    console.log("---------------------")
}

console.log(chalk.bold.blue("STUDENTS DATA"));
console.log(chalk.bold.blue("-------------"));
for(let i = 0; i < numOfStudents; i++){
    console.log(students[i].showInfo());
    console.log("-------------");
}

async function askGrade(): Promise<number>{
    let year = 0;
    let grade_year = await inquirer.prompt({
        type: "list",
        name: "grade",
        message: "Enter grade level: ",
        choices:["1. Freshman", "2. Sophomore", "3. Junior", "4. Senior"]
    });

    if(grade_year.grade == "1. Freshman"){
        return year = 1;
    }else if(grade_year.grade == "2. Sophomore"){
        return year = 2;
    }else if(grade_year.grade == "3. Junior"){
        return year = 3;
    }else{
        return year = 4;
    }
}