import { connectDB, disconnectDB } from "../db/createDB.js";
import inquirer from "inquirer";
import Task from "../schema/taskSchema.js";
import ora from "ora";
import chalk from "chalk";

export async function updateTask(){
    try{
        await connectDB();
        const tasks = await Task.find();
        if(tasks.length === 0){
            console.log(chalk.red("No tasks to update"));
            process.exit(1);
        }
        const taskChoices = tasks.map(task => ({
            name: task.name,
            value: task._id
        }));
        const response = await inquirer.prompt([
            {
                type: "list",
                name: "task",
                message: "Select task to update",
                choices: taskChoices
            }
        ]);
        const task = await Task.findById(response.task);
        const updateResponse = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter task name",
                default: task.name
            },
            {
                type: "input",
                name: "description",
                message: "Enter task description",
                default: task.description
            },
            {
                type: "list",
                name: "priority",
                message: "Select task priority",
                choices: ["low", "medium", "high"],
                default: task.priority
            }
        ]);
        const spinner = ora("Updating task").start();
        await Task.findByIdAndUpdate(response.task, updateResponse);
        spinner.succeed("Task updated");
        await disconnectDB();
    }
    catch(error){
        console.log(chalk.red(error));
        process.exit(1);
    }
}

export async function completeTask(){
    try{
        await connectDB();
        const tasks = await Task.find({completed: false});
        if(tasks.length === 0){
            console.log(chalk.red("No tasks to complete"));
            process.exit(1);
        }
        const taskChoices = tasks.map(task => ({
            name: task.name,
            value: task._id
        }));
        const response = await inquirer.prompt([
            {
                type: "list",
                name: "task",
                message: "Select task to complete",
                choices: taskChoices
            }
        ]);
        const spinner = ora("Completing task").start();
        await Task.findByIdAndUpdate(response.task, {completed: true});
        spinner.succeed("Task completed");
        await disconnectDB();
    }
    catch(error){
        console.log(chalk.red(error));
        process.exit(1);
    }
}

        