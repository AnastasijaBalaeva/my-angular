import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import {StudentDetailComponent } from './components/student-detail/student-detail.component';
import {AddStudentComponent} from './components/add-student/add-student.component';
import {SortStudentsComponent} from './components/sort-students/sort-students.component';
const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: StudentDetailComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'sort-student', component: SortStudentsComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
