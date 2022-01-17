import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements OnInit {
  @Input() caption: string = "";
  @Input() confirmText: string = "Принять";
  @Input() cancelText: string = "Отменить";

  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

}
