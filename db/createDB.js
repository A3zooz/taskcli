import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ora from 'ora';
import chalk from 'chalk';
dotenv.config();

export async function connectDB(){

    // const spinner = ora('Connecting to MongoDB').start();

    try {
        await mongoose.connect(process.env.MONGODB_KEY);
        // spinner.succeed(chalk.green('Connected to MongoDB'));
    }
    catch(err){
        // spinner.fail(chalk.red('Failed to connect to MongoDB'));
        console.error(err);
        process.exit(1);
    }

}

export async function disconnectDB(){
    try{await mongoose.disconnect();
    console.log(chalk.yellow('Disconnected from MongoDB'))
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}
connectDB()