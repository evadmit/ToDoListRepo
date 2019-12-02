import { Document } from 'mongoose';
import { CoordinatesDto } from 'src/shared/DTOs/coordinates.dto';
 
export interface Todo extends Document{
 title: string;
 description: string;
 isCompleted: boolean;
 coordinates: CoordinatesDto;
 created_at: { type: Date };
 image : string;
 userEmail : string;
}