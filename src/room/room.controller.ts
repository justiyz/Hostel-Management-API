import { Controller, Get, Query } from "@nestjs/common";
import { RoomService } from "./room.service";



@Controller('rooms')
export class RoomController{

    constructor(private readonly roomService: RoomService){}


    @Get()
    async findRoomsByHostelId(@Query('hostelId') hostelId: string) {
        return await this.roomService.findRoomsByHostelId(hostelId);
    }}