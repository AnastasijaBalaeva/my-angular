import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Student} from '../../models/Student';
import {StudentService} from '../../services/student.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.less']
})
export class AddStudentComponent implements OnInit, OnChanges {

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z-ЁёА-я]+$')]],
    surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z-ЁёА-я]+$')]],
    studentPatronymic: [''],
    studentDateBirth: [''],
    studentAvgScore: ['', this.customFloatValidator]
  });

  submit = false;
  buttonText = 'Создать';

  @Input() student: Student;

  @Output() submitted: EventEmitter<Student> = new EventEmitter<Student>();

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['student']?.currentValue) {
      console.log(new Date(this.student.dateBirth).toLocaleDateString('en-US'));
      const date = this.student.dateBirth;
      this.form.get('name')?.setValue(this.student.name);
      this.form.get('surname')?.setValue(this.student.surname);
      this.form.get('studentPatronymic')?.setValue(this.student.patronymic);
      this.form.get('studentDateBirth')?.setValue(new Date(this.student.dateBirth).toISOString().slice(0, 10));
      this.form.get('studentAvgScore')?.setValue(this.student.avgScore);
      this.buttonText = 'Обновить';
    } else {
      this.buttonText = 'Создать';
    }
  }

  add(): void {
    this.submit = true;
    if (this.form.valid) {

      this.submitted.emit({
        id: this.student?.id,
        name: this.form.get('name')?.value,
        surname: this.form.get('surname')?.value,
        patronymic: this.form.get('studentPatronymic')?.value,
        dateBirth: new Date(this.form.get('studentDateBirth')?.value),
        avgScore: this.form.get('studentAvgScore')?.value,
      })
    }
  }

  customFloatValidator(control: AbstractControl): ValidationErrors | null {
    const forbidden = isNaN(control.value);
    return forbidden ? {forbiddenValue: {value: control.value}} : null;
  };

}
