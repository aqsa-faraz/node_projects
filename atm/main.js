import inquirer from "inquirer";
import { faker } from '@faker-js/faker';
import chalk from "chalk";
//const users = [{}] // hardcoded list of users
const createUser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(10000000 * Math.random() * 90000000),
            balance: Math.floor(Math.random() * 500000)
        };
        users.push(user);
    }
    return users;
};
// ATM Operations
const atm = async (users) => {
    const transaction = await inquirer.prompt({
        type: "number",
        message: "Enter Pin: ",
        name: "pin"
    });
    const user = users.find(val => val.pin === transaction.pin);
    if (user) {
        console.log(chalk.greenBright.bold(`Welcome ${user.name}`));
        atmOperations(user);
        return;
    }
    console.log(chalk.red("Invalid pin"));
};
const atmOperations = async (user) => {
    const operation = await inquirer.prompt({
        type: "list",
        name: "transactionType",
        choices: ["Deposit", "Cash Withdrawal", "Balance Inquiry", "Exit"],
        message: "Please select a transaction"
    });
    if (operation.transactionType === "Balance Inquiry") {
        console.log(`Balance: ${user.balance}`);
    }
    else if (operation.transactionType === "Deposit") {
        let deposit = await inquirer.prompt([{
                type: "number",
                name: "depositAmount",
                message: "Enter amount: "
            }]);
        user.balance += deposit.depositAmount;
        console.log(`Amount Deposit: ${deposit.depositAmount}, new balance: ${user.balance}`);
    }
    else if (operation.transactionType === "Cash Withdrawal") {
        let withdraw = await inquirer.prompt([{
                type: "list",
                name: "withdrawal",
                message: "Select amount: ",
                choices: [1000, 2500, 5000, 10000, 25000, 50000]
            }]);
        if (withdraw.withdrawal > 25000) {
            console.log("Entered amount exceeds limit! Your daily transaction limit is 25000.");
        }
        else if (withdraw.withdrawal < user.balance) {
            if (withdraw.withdrawal === 1000) {
                user.balance -= withdraw.withdrawal;
            }
            else if (withdraw.withdrawal === 2500) {
                user.balance -= withdraw.withdrawal;
            }
            else if (withdraw.withdrawal === 5000) {
                user.balance -= withdraw.withdrawal;
            }
            else if (withdraw.withdrawal === 1000) {
                user.balance -= withdraw.withdrawal;
            }
            else if (withdraw.withdrawal === 25000) {
                user.balance -= withdraw.withdrawal;
            }
            else if (withdraw.withdrawal === 50000) {
                user.balance -= withdraw.withdrawal;
            }
            console.log(`Cash Withdrawal: ${withdraw.withdrawal}, Remaining balance: ${user.balance}`);
        }
        else {
            console.log(chalk.red("Insufficient Balance"));
        }
    }
    else if (operation.transactionType === "Exit") {
        console.log(chalk.greenBright("Thank you for using our ATM!"));
    }
};
const users = createUser();
atm(users);
