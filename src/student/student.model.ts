import * as mongoose from 'mongoose';


export const StudentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true} , 
     
}, {timestamps: {createdAt: 'createdDate', updatedAt: 'modifiedDate'}});

export interface Student{ 
    id: string;
    fullName: string;
    age: number;
    department: string;
    password: string;
    createdDate: string;
    modifiedDate: string;
}