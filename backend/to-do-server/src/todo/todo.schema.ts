import * as mongoose from 'mongoose';
export const TodoSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    status: String,
    user_id: Number,
    created_at: { type: Date, default: Date.now }
  });