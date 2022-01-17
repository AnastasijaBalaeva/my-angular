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
    if (type === 'date') {
      this.students = this.studentsList.filter(student => {
        return (student.dateBirth > new Date(value.from) && student.dateBirth < new Date(value.to)) || !value.from && !value.to;
      })
    } else if (type === 'number') {
      this.students = this.studentsList.filter(student => {
        return (student.avgScore > +value.from && student.avgScore < +value.to) || !value.from && !value.to;
      })
    }
  }
}
