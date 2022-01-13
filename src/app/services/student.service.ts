import {Student} from '../models/Student';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {Observable, of} from 'rxjs';
import {STUDENTS} from './mock-students';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private students: Student[] = STUDENTS;
  constructor(private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getStudents(): Observable<Student[]> {
    return of(this.students)
      .pipe(
        tap(_ => this.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudents', [])));
  }

  getStudent(id: number): Observable<Student> {
    return of(this.students.find(item => item.id === id)).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );

    /*   const student = STUDENTS.find(s=>s.id === id)!;
       this.messageService.add('StudentsService: fetched students id=${id}')
       return of(student)*/
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  updateStudent(student: Student): Observable<Student> {
    const index = this.students.findIndex(item => item.id === student.id);
    this.students[index] = student;
    return of(student).pipe(
      tap(_ => this.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  /** POST: add a new student to the server */
  addStudent(student: Student): Observable<Student> {
    student.id = this.students.length + 1;
    this.students.push(student);
    return of(student).pipe(
      tap((newStudent: Student) => this.log(`added student w/ id=${newStudent.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  deleteStudent(id: number): Observable<Student> {
    const index = this.students.findIndex(item => item.id === id);
    this.students.slice(index, 1);
    return of(this.students[index]).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

}
