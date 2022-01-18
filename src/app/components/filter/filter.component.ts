import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Student} from "../../models/Student";

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
  @Input() type: string = 'date';
  @Input() title: string = '';
  @Input() students: Student[];
  @Output() studentsChange: EventEmitter<Student[]> = new EventEmitter<Student[]>();

  dateForm: FormGroup = this.fb.group({
    from: [''],
    to: ['']
  });

  numberForm: FormGroup = this.fb.group({
    from: [''],
    to: ['']
  });

  constructor(private fb: FormBuilder) {
  }


  filterStudents(): void {
    let filterValues: Filter = {
      date: {
        from: this.dateForm.get('from').value ? new Date(this.dateForm.get('from').value) : null,
        to: this.dateForm.get('to').value ? new Date(this.dateForm.get('to').value) : null
      },
      number: {
        from: +this.numberForm.get('from').value,
        to: +this.numberForm.get('to').value
      }
    }
    this.studentsChange.emit(this.students.filter(student => {
      return this.isFiltered(filterValues.date, student.dateBirth) && this.isFiltered(filterValues.number, student.avgScore);
    }))
  }

  isFiltered(filterItem: FilterItem, value: number | Date): boolean {
    if (!filterItem.from && !filterItem.to) {
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

  clear(): void {
    this.dateForm.reset();
    this.numberForm.reset();
    this.studentsChange.emit(this.students);
  }
}
