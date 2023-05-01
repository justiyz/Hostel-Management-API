import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { RoomModule } from "src/room/room.module";
import { StudentModule } from "src/student/student.module";
import { HostelController } from "./hostel.controller";
import { HostelSchema } from "./hostel.model";
import { HostelService } from "./hostel.service";


@Module({
    imports: [
        RoomModule,
        StudentModule,
        MongooseModule.forFeature([{ name: 'Hostel', schema: HostelSchema }])],
    controllers: [HostelController],
    providers: [HostelService],
    
})
export class HostelModule{}