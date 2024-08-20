import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/createDB.js";
import Task from "../schema/taskSchema.js";
import chalk from "chalk";
import ora from "ora";

async function input(){
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter task name',
            validate: value => value ? true : 'Task name is required'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter task description'
        },
        {
            type: 'list',
            name: 'priority',
            message: 'Select task priority',
            choices: ['low', 'medium', 'high']
        }
    ]);

    return answers;
}

const askQuestions = async () => {
    const taskArray = []
    let answer = 'yes';
    while(answer === 'yes'){
        const task = await input();
        taskArray.push(task);
        const { anotherTask } = await inquirer.prompt({
            type: 'list',
            name: 'anotherTask',
            message: 'Do you want to add another task?',
            choices: ['yes', 'no']
        });
        answer = anotherTask;
    }
    return taskArray;
}

export async function addTask(){
    try{
        const tasks = await askQuestions();
        await connectDB();
        var spinner = ora('Creating the todos...').start()
        const task = await Task.insertMany(tasks);
        spinner.stop();
        spinner.succeed(chalk.green('Task added successfully'));
    }
    catch(err){
        spinner.fail(chalk.red('Failed to add task'));
        console.error(err);
        process.exit(1);
    }
    finally{
        await disconnectDB();
    }
}

