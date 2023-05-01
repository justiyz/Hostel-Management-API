
import * as mongoose from 'mongoose';
import { Student } from 'src/student/student.model';



export const RoomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    hostelId: { type: String, required: true },
    maxNoOfOccupantsPerRoom: Number,
    currentNoOfOccupants: Number,
    availableBeds: Number,
    students: [],

}, {timestamps: {createdAt: 'createdDate', updatedAt: 'modifiedDate'}});

export interface Room extends mongoose.Document{
    id: string,
    roomNumber: string,
    hostelId: string,
    maxNoOfOccupantsPerRoom: number,
    currentNoOfOccupants: number,
    availableBeds: number,
    students: Student [],
    
}