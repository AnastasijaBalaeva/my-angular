import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit, OnDestroy {
  @Input() type: string = 'date';
  @Input() title: string = '';
  @Output() submit: {from: string, to: string};
  constructor() {
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
