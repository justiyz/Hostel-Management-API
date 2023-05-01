import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { StudentController } from "./student.controller";
import { StudentSchema } from "./student.model";
import { StudentService } from "./student.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Student', schema: StudentSchema}])],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService]
})
export class StudentModule{}