import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { Param, Patch, Query,  } from "@nestjs/common/decorators";
import { RoomAllocationDto } from "src/room/room.allocation.dto";
import { HostelService } from "./hostel.service";
import { HostelDto } from "./hostelDto";

@Controller('hostels')
export class HostelController{

    constructor(private readonly hostelService: HostelService) { }

    @Post()
    async createHostel(@Body() hostelDto: HostelDto){
        await this.hostelService.createHostel(hostelDto)
        return HttpStatus.OK;
    }

    @Get('/all')
    async findAllHostels(@Query('isAvailable') isAvailable?: string, @Query('isTaken') isTaken?: string) {
         return await this.hostelService.findHostelsBySearchFilters(isAvailable, isTaken);
    }

    @Patch()
    async allocateRoomToStudent(@Body() dto: RoomAllocationDto) {
        await this.hostelService.allocateRoomToStudent(dto);
        return HttpStatus.OK;
    }

    @Get('/students/:id')
    async findAllStudentsAllocatedToAnHostel(@Param('id') hostelId: string) {
        return await this.hostelService.findAllStudentsAllocatedToAnHostel(hostelId);
    }

    @Patch('remove-student')
    async removeStudentFromHostel(@Body() dto: RoomAllocationDto) {
        return await this.hostelService.removeStudentFromAnHostel(dto);
    }

 }