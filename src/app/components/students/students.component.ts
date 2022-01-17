import {Component, OnInit} from '@angular/core';

import {Student} from '../../models/Student';
import {StudentService} from '../../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.less']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  studentsList: Student[] = [];
  student: Student;
  popupVisible: boolean = false;
  deleteStudent: Student;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.studentsList = students;
    });
  }

  delete(event: boolean): void {
    if (event) {
      this.students = this.students.filter(h => h.id !== this.deleteStudent.id);
      this.studentService.deleteStudent(this.deleteStudent.id as number).subscribe(() => this.deleteStudent = null);
    } else {
      this.deleteStudent = null;
    }
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

  filterStudents(value: {from: string, to: string}, type: string): void {
    let valueFrom: Date | Number;
    let valueTo: Date | Number;

    if (type === 'date') {
      valueFrom = new Date(value.from);
      valueTo = new Date(value.to);
    } else if (type === 'number') {
      valueFrom = +value.from;
      valueTo = +value.to;
    }

    this.students = this.studentsList.filter(student => {
      let studentValue = type === 'date' ? student.dateBirth : student.avgScore;
      if (!value.to) {
        return studentValue >= valueFrom;
      }
      if (!value.from) {
        return studentValue <= valueTo;
      }

      if (!value.from && !value.to) {
        return true;
      }

      return (studentValue >= valueFrom && studentValue <= valueTo);
    })
  }
}
