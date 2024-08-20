import mongoose from "mongoose";
import { nanoid } from "nanoid";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    code: {
        type: String,
        required: true, 

    }
    
})

taskSchema.pre('validate', function(next){
    this.code = nanoid(10);
    next();
})

const Task = mongoose.model('Task', taskSchema);
export default Task;