import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { StudentService } from '../../services/student.service';

export interface FilterItem {
  from: number | Date,
  to: number | Date
}

export interface Filter {
  date: FilterItem,
  number: FilterItem
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})

export class FilterComponent {

  dateForm: FormGroup = this.fb.group({
    from: [''],
    to: ['']
  });

  numberForm: FormGroup = this.fb.group({
    from: [''],
    to: ['']
  });

  constructor(private fb: FormBuilder, private studentService: StudentService) {
  }


  filterStudents(): void {
    this.studentService.filterStudents({
      date: {
        from: this.dateForm.get('from').value ? new Date(this.dateForm.get('from').value) : null,
        to: this.dateForm.get('to').value ? new Date(this.dateForm.get('to').value) : null
      },
      number: {
        from: +this.numberForm.get('from').value,
        to: +this.numberForm.get('to').value
      }
    });
  }

  clear(): void {
    this.dateForm.reset();
    this.numberForm.reset();
    this.studentService.filterStudents({date: null, number: null});
  }
}
