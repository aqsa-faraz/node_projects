import inquirer from "inquirer";
let todos = ["Wake up at 5 am", "Offer namaz at 6:15 am", "Workout at 7 a.m"];
let _continue = 0;
async function createTodo(todoArr) {
    do {
        let todo = await inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Do you want to? ",
            choices: ["add", "update", "view", "delete"]
        });
        if (todo.operation === "add") {
            let addTask = await inquirer.prompt({
                type: "input",
                name: "task",
                message: "Add a task: "
            });
            todoArr.push(addTask.task);
            console.log(todoArr);
            _continue++;
        }
        if (todo.operation === "update") {
            let updateTask = await inquirer.prompt({
                type: "list",
                name: "update",
                message: "Select a task to update: ",
                choices: todoArr.map(item => item)
            });
            let addUpdatedTask = await inquirer.prompt({
                type: "input",
                name: "updatedTask",
                message: "Add a task: "
            });
            let newTodos = todoArr.filter(val => val !== updateTask.update);
            todoArr = [...newTodos, addUpdatedTask.updatedTask];
            console.log(todoArr);
            _continue++;
        }
        if (todo.operation === "view") {
            console.log(todoArr);
            _continue++;
        }
        if (todo.operation === "delete") {
            let deletetask = await inquirer.prompt({
                type: "list",
                name: "del",
                message: "Select a task to delete: ",
                choices: todoArr.map(item => item)
            });
            let newTodos = todoArr.filter(val => val !== deletetask.del);
            // todoArr = [...newTodos]
            todoArr = newTodos;
            console.log(todoArr);
            _continue++;
        }
    } while (_continue <= 10);
}
createTodo(todos);
