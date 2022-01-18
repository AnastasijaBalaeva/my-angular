import {Component, OnInit} from '@angular/core';
import {Student} from '../../models/Student';
import {StudentService} from '../../services/student.service';
import { STUDENTS } from '../../services/mock-students';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.less']
})
export class StudentsComponent implements OnInit{

  students: Student[];
  studentsList: Student[] = STUDENTS;
  student: Student;
  popupVisible: boolean = false;
  deleteStudent: Student;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.studentService.students$.subscribe(students => this.students = students);
    this.studentService.getStudents();
  }

  delete(event: boolean): void {
    if (event) {
      this.studentService.deleteStudent(this.deleteStudent.id);
    }

    this.deleteStudent = null;
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
      this.studentService.updateStudent(student);
    } else {
      this.studentService.addStudent(student);
    }

    this.popupVisible = false;
  }

  search($event: Event): void {
    const value = ($event.target as HTMLInputElement).value;
    this.studentsList.map(student => {
      student.checked = value?.length && student.name.toLowerCase().includes(value.toLowerCase());
    })
  }
}
