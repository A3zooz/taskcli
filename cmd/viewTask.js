import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/createDB.js";
import Task from "../schema/taskSchema.js";
import chalk from "chalk";
import ora from "ora";

export async function viewTask(){
    try{
        await connectDB();

        const spinner = ora('Fetching...').start()

        const tasks = await  Task.find({})

        spinner.stop()

        if(tasks.length == 0){
            console.log(chalk.blueBright('You have no tasks'))
        }
        else{
            tasks.forEach(element => {
                console.log(
                    chalk.magentaBright('Task Code: ' + element.code + '\n' +
                    chalk.greenBright('Name: ' + element.name + '\n' + 
                    chalk.greenBright('Description: ' + element.description + '\n' +
                    chalk.redBright('Priority: ' + element.priority + '\n' + 
                    chalk.blueBright('Completed: ' + element.completed + '\n')
                    )
                    )
                    )
                    )
                )
            });
        }
        await disconnectDB();
    }catch(err){
        console.log(chalk.redBright('ERROR ' + err))
        process.exit(1)
    }

    }

