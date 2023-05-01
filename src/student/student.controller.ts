import { Controller, Post, Body, HttpStatus, Get } from "@nestjs/common";
import { Param } from "@nestjs/common/decorators";
import { async } from "rxjs";
import { StudentService } from "./student.service";



@Controller('students')
export class StudentController{ 

    constructor(private readonly studentService: StudentService){}

    @Post()
    async createStudent(@Body() studentDto: {fullName: string, age: number, department: string, password: string }){
        await this.studentService.createStudent(studentDto.fullName, studentDto.age, studentDto.department, studentDto.password)
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