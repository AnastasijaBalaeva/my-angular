import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})

export class FilterComponent implements OnInit, OnDestroy {
  @Input() type: string = 'date';
  @Input() title: string = '';
  @Output() submit: EventEmitter<{from: string, to: string}> = new EventEmitter<{from: string, to: string}>();

  form: FormGroup = this.fb.group({
    from: [''],
    to: ['']
  });

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  submitValue(): void {
    this.submit.emit({
      from: this.form.get('from').value,
      to: this.form.get('to').value
    })
  }
}
