import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortStudentsComponent } from './sort-students.component';

describe('SortStudentsComponent', () => {
  let component: SortStudentsComponent;
  let fixture: ComponentFixture<SortStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
