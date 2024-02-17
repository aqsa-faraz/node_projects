import inquirer from "inquirer";
import chalk from "chalk";


let apiLink = "https://v6.exchangerate-api.com/v6/b9af1d4125beebadf6d0b3b0/latest/PKR";

let fetchData = async(data: string)=>{
    let fetchApi = await fetch(data);
    let res = await fetchApi.json();
    return res.conversion_rates;

};

let data = await fetchData(apiLink);

// object.keys method is converting an object into an array
let countries = Object.keys(data)
//console.log(data);

let fromCurrency = await inquirer.prompt({
    type: "list",
    name: "currencyfrom",
    message: "Convert from: ",
    choices: countries
});

let user_amount = await inquirer.prompt({
    type: "number",
    name: "amount",
    message: "Enter amount: "
});

let toCurrency = await inquirer.prompt({
    type: "list",
    name: "currencyto",
    message: "Convert to: ",
    choices: countries.filter((val => val!==fromCurrency.currencyfrom))
});

// api for currency conversion
let conversionLink = `https://v6.exchangerate-api.com/v6/b9af1d4125beebadf6d0b3b0/pair/${fromCurrency.currencyfrom}/${toCurrency.currencyto}`

//console.log(conversion)

let fetchConversionData = async(data: string)=>{
    let conversionData = await fetch(data);
    let res = await conversionData.json();
    return res.conversion_rate;

};

let cnv_rate = await fetchConversionData(conversionLink);

let convertedValue = user_amount.amount * cnv_rate;

console.log(`Your ${chalk.bold.italic.blue(fromCurrency.currencyfrom)} ${user_amount.amount} in ${chalk.bold.italic.blue(toCurrency.currencyto)} is ${convertedValue.toFixed(2)}`);