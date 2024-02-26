import inquirer from "inquirer";
import chalk from "chalk";


class Customer{
    private _firstName!: string;
    private _lastName!: string;
    private _gender!: string;
    private _age!: number;
    private _mobileNumber!: string;
    private _bankAccount!: BankAccount;

    
    public get firstName() : string {
        return this._firstName;
    }
    
    public set firstName(v : string) {
        this. _firstName= v;
    }

    
    public get lastName() : string {
        return this._lastName;
    }
    
    public set lastName(v : string) {
        this. _lastName= v;
    }

    
    public get gender() : string {
        return this._gender;
    }
    
    public set gender(v : string) {
        this. _gender= v;
    }

    
    public get age() : number {
        return this._age 
    }
     
     public set age(v : number) {
        this. _age= v;
     }
    
     
     public get mobileNumber() : string {
        return this._mobileNumber;
     }
     
     public set mobileNumber(v : string) {
        this. _mobileNumber= v;
     }

     
     public get bankAccount() : BankAccount {
        return this._bankAccount;
     }
     
     public set bankAccount(v : BankAccount) {
        this. _bankAccount= v;
     }
     
    public customerInfo(): string{
        return `Name: ${this._firstName} ${this._lastName}\nAge: ${this._age}\nGender: ${this._gender}\nMobile Number: ${this._mobileNumber}\nAccount Balance: ${this.bankAccount.accountBalance}`
    };

}


// The IBankAccount interface is just to tell the BankAccount that what are the methods that the BankAccount must implement.
interface IBankAccount{
    debit(d: number): string;
    credit(d: number): string;
}

class BankAccount implements IBankAccount{
    private _accountBalance: number;

    public get accountBalance() : number {
        return this._accountBalance;
    }
    
    public set accountBalance(v : number) {
        this. _accountBalance= v;
    }

    constructor(){
        this._accountBalance = 100;
    }
    
    
    debit(amount: number): string {
        let statement = "Sorry, you have insufficient balance!";
        if(amount > 0){
            statement = "The amount you entered is wrong!";

            if(this._accountBalance > amount){
                this._accountBalance -=amount;
                statement = chalk.italic.green(`Transaction successful! New account balance is ${this._accountBalance}`);
            }else{
                statement = chalk.italic.red(`You don't have enough money to do this transaction.`);
            }
        }
        return statement;
    }

    credit(amount: number): string {
        let statement = chalk.italic.red(`Transaction Failed!`);

        if(amount > 0){
            this._accountBalance+= amount;
            if(amount > 100){
                this._accountBalance-=1;
            }
            statement = chalk.italic.green(`Your account has been credited successfully`);
        }
        return statement;
    }

}

//

async function userInput(field: string, _message: string){
    let user = await inquirer.prompt({
        type: "input",
        name: field,
        message: `Enter ${_message} `});
    
    return user;
}

console.log(chalk.bold.blue(`Enter Account Details`));

let myCustomer = new Customer();

// let ask = await inquirer.prompt({
//     type: "input",
//     name: "fname",
//     message: "Enter first name: "
// });

myCustomer.firstName = await userInput("first_name", "your first name: ").then((res)=>res.first_name); //ask.fname
myCustomer.lastName = await userInput("last_name", "your last name: ").then((res)=>res.last_name);
myCustomer.age = await userInput("age", "your age: ").then((res)=>res.age);
myCustomer.gender = await userInput("gender", "your gender: ").then((res)=>res.gender);
myCustomer.mobileNumber = await userInput("mobileNumber", "your mobile number: ").then((res)=>res.mobileNumber);
myCustomer.bankAccount = new BankAccount();
myCustomer.bankAccount.accountBalance = await userInput("bankAccount", "your bank account: ").then((res)=>res.bankAccount);



console.log(chalk.bold.blue(`Customer Details`));
console.log(myCustomer.customerInfo());

console.log(myCustomer.bankAccount.debit(2500000));
console.log(myCustomer.bankAccount.credit(15000));
let myBankAccount = new BankAccount();