import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Room } from "./room.model";

import { RoomDto } from "./roomDto";


@Injectable()
export class RoomService{
    constructor(
        @InjectModel('Room') private readonly RoomModel: Model<Room>,
    ) { }
    

    async save(room: Room) {
        room.save();
    }

    async saveRoom(roomDto: RoomDto) {
        
        const newRoom = new this.RoomModel({
            roomNumber: roomDto.roomNumber,
            hostelId: roomDto.hostelId,
            currentNoOfOccupants: roomDto.currentNoOfOccupants,
            maxNoOfOccupantsPerRoom: roomDto.maxNoOfOccupantsPerRoom
        })
        await newRoom.save();
    }

    async findAllRooms() {
        const rooms = await this.RoomModel.find().exec();
        return rooms;
    }

    async findRoomsByHostelId(hostelId: string) {
        return await this.RoomModel.find({ hostelId }).exec();
    }

    public async roomExists(id: string): Promise<boolean>{
        if (await this.RoomModel.exists({ id })) {
            return true;
        } 
    }
}