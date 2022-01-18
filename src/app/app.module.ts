import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { SortStudentsComponent } from './components/sort-students/sort-students.component';
import { PopupComponent } from './components/popup/popup.component';
import { FilterComponent } from './components/filter/filter.component';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentDetailComponent,
    AddStudentComponent,
    SortStudentsComponent,
    PopupComponent,
    FilterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
