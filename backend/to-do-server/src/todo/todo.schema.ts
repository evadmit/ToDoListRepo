import * as mongoose from 'mongoose';
import { CoordinatesDto } from 'src/shared/DTOs/coordinates.dto';
export const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    user_id: Number, 
    isCompleted: Boolean,  
    coordinates: Object,
    created_at: { type: Date, default: Date.now },
   // image: { data: Buffer, contentType: String }
  });

 