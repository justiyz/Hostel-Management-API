import * as mongoose from 'mongoose';



export const HostelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    noOfRooms: { type: Number, required: true },
    isTaken: { type: Boolean, required: true },
    isAvailable: {type: Boolean, required: true}
     
}, {timestamps: {createdAt: 'createdDate', updatedAt: 'modifiedDate'}});


export interface Hostel{ 
    id: string,
    name: string,
    location: string,
    noOfRooms: number,
    isTaken: boolean,
    isAvailable: boolean
}