import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import {InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose";
import { Student } from "./student.model";

@Injectable()
export class StudentService{

    constructor(@InjectModel('Student') private readonly StudentModel: Model<Student>){}

    async createStudent(fullName: string, age: number, dept: string, password: string) {
        const newStudent = new this.StudentModel({
            fullName: fullName,
            age: age,
            department: dept,
            password: password,
        
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