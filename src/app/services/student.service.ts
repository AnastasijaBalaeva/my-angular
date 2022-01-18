import {Student} from '../models/Student';
import {Injectable} from "@angular/core";
import { Subject } from 'rxjs';
import {STUDENTS} from './mock-students';
import { Filter, FilterItem } from '../components/filter/filter.component';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private students = STUDENTS;
  private studentsSubject$: Subject<Student[]> = new Subject<Student[]>();
  public students$ = this.studentsSubject$.asObservable();

  constructor() {
  }

  getStudents(): void {
    this.studentsSubject$.next(this.students);
  }

  searchStudent(search?: string): void {
    this.students.forEach(student => {
      student.checked = search?.length && student.name.toLowerCase().includes(search.toLowerCase());
    });
    this.studentsSubject$.next(this.students);
  }

  getStudent(id: number): Student {
    return this.students.find(item => item.id === id);
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(item => item.id === student.id);
    this.students[index] = student;
    this.studentsSubject$.next(this.students);
  }

  addStudent(student: Student): void {
    student.id = this.students.length + 1;
    this.students.push(student);
    this.studentsSubject$.next(this.students);
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
    this.studentsSubject$.next(this.students);
  }

  filterStudents(filterValues: Filter): void {
    const students = this.students.filter(student => {
      return this.isFiltered(filterValues.date, student.dateBirth) && this.isFiltered(filterValues.number, student.avgScore);
    });
    this.studentsSubject$.next(students);
  }

  isFiltered(filterItem: FilterItem, value: number | Date): boolean {
    if (!filterItem?.from && !filterItem?.to) {
      return true;
    }

    if (!filterItem.to) {
      return value >= filterItem.from;
    }
    if (!filterItem.from) {
      return value <= filterItem.to;
    }

    return (value >= filterItem.from && value <= filterItem.to);
  }

}
