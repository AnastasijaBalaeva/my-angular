import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { SortStudentsComponent } from './components/sort-students/sort-students.component';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    MessagesComponent,
    DashboardComponent,
    StudentDetailComponent,
    AddStudentComponent,
    SortStudentsComponent,
    PopupComponent
  ],
  imports: [
    HttpClientModule,

    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],

  bootstrap: [AppComponent]
})

export class AppModule {


}
