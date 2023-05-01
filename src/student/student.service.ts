import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import {InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose";
import { Student } from "./student.model";
import { CreateStudentDto } from "./studentDto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService{

    constructor(@InjectModel('Student') private readonly StudentModel: Model<Student>){}

    async createStudent(dto: CreateStudentDto) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(dto.password, salt);

        const newStudent = new this.StudentModel({
            fullName: dto.fullName,
            age: dto.age,
            department: dto.department,
            password: hashPassword,
        
        });
        const result = await newStudent.save();
    }

    async findAllStudents() {
        const students = await this.StudentModel.find().exec();
        return students.map((std) => ({
            id: std.id,
            fullName: std.fullName,
            age: std.age,
            department: std.department,
            password: std.password,
            createdDate: std.createdDate,
            modifiedDate: std.modifiedDate,
        }));
    }

    async findStudentById(studentId: string) {
        const student = await this.findStudent(studentId);
        return student;
    }

    private async findStudent(id: string): Promise<Student>{
        let student;
        try {
            student = await this.StudentModel.findById(id);   
        } catch (error){
            throw new NotFoundException('The passed id is not valid');
        }
        
        if (!student) {
            throw new NotFoundException('Could not find a student by that id');
        }
        return student;
    }
}