import * as mongoose from 'mongoose';
export const TodoSchema = new mongoose.Schema({
    name: String,
    description: String,
    creationdate:Date,
    isCompleted: Boolean,
    userId: Number,
    id: Number,
  });