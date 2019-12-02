import * as mongoose from 'mongoose';
import { CoordinatesDto } from 'src/shared/DTOs/coordinates.dto';
export const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCompleted: Boolean,
  coordinates: Object,
  created_at: { type: Date, default: Date.now },
  image: String,
  userEmail: String
});

