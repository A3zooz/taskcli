#!/usr/bin/env node

import {addTask} from './cmd/addTask.js';
import {deleteTask} from './cmd/deleteTask.js';
import {viewTask} from './cmd/viewTask.js';
import { Command } from 'commander';


const program = new Command();

program.name('taskcli').description('Task Manager').version('1.0.0');


program.command('view').description('view all tasks').action(viewTask)
program.command('add').description('add a tasks').action(addTask)
program.command('delete').description('delete tasks').action(deleteTask)


program.parse();