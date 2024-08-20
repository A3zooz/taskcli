import inquirer from "inquirer";
import Task from "../schema/taskSchema.js";
import { connectDB, disconnectDB } from "../db/createDB.js";
import ora from "ora";
import chalk from "chalk";

export async function deleteTask(){
    try{
        await connectDB();
        const tasks = await Task.find();
        if(tasks.length === 0){
            console.log(chalk.red("No tasks to delete"));
            process.exit(1);
        }
        
        // Create an array of task choices with task name
        const taskChoices = tasks.map(task => ({
            name: task.name,
            value: task._id
        }));
        const response = await inquirer.prompt([
            {
                type: "list",
                name: "task",
                message: "Select task to delete",
                choices: taskChoices
            }
        ]);
        const spinner = ora("Deleting task").start();
        await Task.findByIdAndDelete(response.task);
        spinner.succeed("Task deleted");
        await disconnectDB();
    }catch(error){
        console.log(chalk.red(error));
        process.exit(1);
    }
        
}

