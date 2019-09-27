import { Document } from 'mongoose';
import { CoordinatesDto } from 'src/shared/DTOs/coordinates.dto';
 
export interface Todo extends Document{
 title: string;
 description: string;
 user_id:number; 
 isCompleted: boolean;
 coordinates: CoordinatesDto;
 created_at: { type: Date };
 image : string;
// image: { data: Buffer, contentType: String };
}