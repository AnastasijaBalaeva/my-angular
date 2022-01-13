import {Component, OnInit} from '@angular/core';

import {Student} from '../../models/Student';
import {StudentService} from '../../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  student: Student;
  popupVisible: boolean = false;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

  delete(student: Student): void {
    this.students = this.students.filter(h => h !== student);
    this.studentService.deleteStudent(student.id as number).subscribe();
  }


  edit(student: Student) {
    this.popupVisible = true;
    this.student = student;
  }

  add() {
    this.popupVisible = true;

  }

  addOrUpdate(student: Student) {
    if (this.student) {
      this.studentService.updateStudent(student).subscribe(() => {
        this.student = null;
        const index = this.students.findIndex(item => item.id === student.id);
        this.students[index] = student;
        this.popupVisible = false;
      })
    } else {
      this.studentService.addStudent(student).subscribe(() => this.popupVisible = false);
    }
  }
}
