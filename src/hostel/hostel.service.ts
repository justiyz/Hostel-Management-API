import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";
import { RoomService } from "src/room/room.service";
import { RoomAllocationDto } from "src/room/roomAllocationDto";
import { RemoveStudentDto } from "src/student/removeStudentDto";
import { Student } from "src/student/student.model";
import { StudentService } from "src/student/student.service";
import { Hostel } from "./hostel.model";
import { HostelDto } from "./hostelDto";



@Injectable()
export class HostelService{

    constructor(
        @InjectModel('Hostel') private readonly HostelModel: Model<Hostel>,
        private readonly roomService: RoomService,
        private readonly studentService: StudentService,
    ) { }


    async createHostel(hostelDto: HostelDto) {
    const newHostel = new this.HostelModel({
        name: hostelDto.name,
        location: hostelDto.location,
        isAvailable: true,
        isTaken: false,
        noOfRooms: hostelDto.noOfRooms
    });
    await newHostel.save();
    if (hostelDto.rooms) {
        Object.values(hostelDto.rooms).forEach((value) => {
            value.hostelId = newHostel.id;
            let newRoom =  this.roomService.saveRoom(value)
        })
        newHostel.noOfRooms = hostelDto.rooms.length;
        newHostel.save();
        }
    }

    findHostelById(hostelId: string) {
        const hostel = this.findHostel(hostelId);
        return hostel;
    }

    async findHostelsBySearchFilters(isAvailable: string, isTaken: string) {
        let hostels: any;
        if (isAvailable=='true') {
            hostels =  (await this.HostelModel.find()).filter(function(hostel){return hostel.isAvailable == true})
        } else if (isTaken=='false') {
            hostels =  (await this.HostelModel.find()).filter(function(hostel){return hostel.isTaken == false})
        } else {
            hostels = await this.HostelModel.find().exec();
        }
        return hostels;
    }


    async allocateRoomToStudent(dto: RoomAllocationDto) {
        const existingStudent = await this.studentService.findStudentById(dto.studentId);
        const existingHostel = await this.findHostelById(dto.hostelId);
        const existingRooms =  await this.roomService.findRoomsByHostelId(existingHostel.id);

        existingRooms.every(room => {
            if (room.currentNoOfOccupants < room.maxNoOfOccupantsPerRoom) {

                room.students.push(existingStudent);
                room.currentNoOfOccupants = room.currentNoOfOccupants + 1;
                this.roomService.save(room); 
                return false;
            }   
        })
    }


    async findAllStudentsAllocatedToAnHostel(hostelId: string) {
        if (!this.hostelExists) {
            throw new NotFoundException('Hostel does not exist')
        }
        const students: Student [] = [];
        let index = 0;
        const existingRooms = await this.roomService.findRoomsByHostelId(hostelId);
        existingRooms.forEach(e => {
            students.push(...e.students);
        });
        return students;
    }

    async removeStudentFromAnHostel(dto: RemoveStudentDto) {
        const existingStudent = await this.studentService.findStudentById(dto.studentId);
        const existingHostel = await this.findHostelById(dto.oldHostelId);
        const existingRooms = await this.roomService.findRoomsByHostelId(existingHostel.id);
        
        //STOPPED HERE

    }



    private async hostelExists(id: string): Promise<boolean>{
        if (await this.HostelModel.exists({ id })) {
            return true;
        } 
    }

    private async findHostel(id: string) {
        let hostel;
        try {
            hostel = await this.HostelModel.findById(id);
        } catch (error){
            throw new NotFoundException('The passed id is not valid');
        } 
        if (!hostel) {
            throw new NotFoundException('Could not find a hostel by that id');
        }
        return hostel;
    }
}