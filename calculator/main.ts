// calculator using inquirer
import inquirer from 'inquirer'

let answer = await inquirer.prompt([{
    type: 'number',
    name: 'operand1',
    message: 'Enter first number?'
},
{
    type: 'number',
    name: 'operand2',
    message: 'Enter second number?'
},
{
    type: 'list',
    name: 'operator',
    message: 'Choose your operation?',
    choices: ['addition', 'subtraction', 'multiplication', 'division']
}])

if(answer.operator === 'addition'){
    console.log(`${answer.operand1} + ${answer.operand2} = ${answer.operand1+answer.operand2}`)
}else if(answer.operator === 'subtraction'){
    console.log(`${answer.operand1} - ${answer.operand2} = ${answer.operand1-answer.operand2}`)
}else if(answer.operator === 'multiplication'){
    console.log(`${answer.operand1} * ${answer.operand2} = ${answer.operand1*answer.operand2}`)
}else{
    if(answer.operand2 != 0){
        console.log(`${answer.operand1} / ${answer.operand2} = ${answer.operand1/answer.operand2}`)
    }else{
        console.log("Can not divide by 0")
    }
}