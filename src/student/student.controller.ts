import { Controller, Post, Body, HttpStatus, Get } from "@nestjs/common";
import { Param } from "@nestjs/common/decorators";
import { async } from "rxjs";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "./studentDto";



@Controller('students')
export class StudentController{ 

    constructor(private readonly studentService: StudentService){}

    @Post()
    async createStudent(@Body() dto: CreateStudentDto){
        await this.studentService.createStudent(dto)
        return HttpStatus.OK;
    }

    @Get()
    async getAllStudents() {
        const students = await this.studentService.findAllStudents();
        return students;
    }

    @Get(':id')
    findById(@Param('id') studentId: string) {
        return this.studentService.findStudentById(studentId);
    }
}