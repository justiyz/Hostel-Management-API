import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule} from './student/student.module'
import mongoose from 'mongoose';
import { HostelModule } from './hostel/hostel.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    StudentModule,
    HostelModule,
    RoomModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/hostel_management')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
