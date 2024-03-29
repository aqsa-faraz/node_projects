import chalk from "chalk";
import inquirer from "inquirer";


class Person{

    private personality!: string;

    constructor(){
        this.personality = "Mystery";
    }

    public askQuestion(answer: number): void{
        if(answer == 1){
            this.personality = "Extrovert";
        }else if(answer == 2){
            this.personality = "introvert";
        }else{
            this.personality = "still a Mystery";
        }
    }

    //This method returns the value of personality
    public getPersonality(): string{
        return this.personality;
    }

}

// creating a new class extending from the 'Person' class.
//Here we can either write or read data to this class
class Student extends Person{

    // private field (backing field) hold any data assigned to 'Name' property
    private _name: string;

    constructor(){
        super();
        this._name = "";
    }

    // Get accessor to read data from the class
    public get name() : string {
        return this._name;
    }
    // The value property of the set accessor is automatically created by the compiler
    public set name(v : string) {
        this. _name = v;
    }
    
}

// Asking personality type from the user
let userInput = await inquirer.prompt({
    type: "number",
    name: "personalityType",
    message: `Type ${chalk.blue(1)} if you like to talk to others, Type ${chalk.blue(2)} if you would rather keep to yourself: `,
    validate: (input)=>{
        if(isNaN(input)){//(typeof input != "number"){
            return chalk.red("Invalid input! Please enter an integer value!");
        }else{
            return true;
        }
    }
});

// creating object of the class
let myPerson: Person = new Person();
myPerson.askQuestion(userInput.personalityType);
console.log(`You are ${chalk.italic.green(myPerson.getPersonality())}`);

// Taking input from the user to set the name
let username = await inquirer.prompt({
    type: "input",
    name: "studentName",
    message: "Enter your name: "
});

let myStudent = new Student();
myStudent.name = username.studentName;
console.log(`Your name is ${chalk.italic.green(myStudent.name)} and your personality type is ${chalk.italic.green(myStudent.getPersonality())}.`);
