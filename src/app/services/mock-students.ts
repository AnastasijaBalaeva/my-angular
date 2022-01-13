import { Student } from '../models/Student';

export const STUDENTS: Student[] = [
  { id: 11, surname: 'Ivanov', name: 'Ivan', patronymic: 'Ivanovich', dateBirth: new Date(1997, 5,20 ), avgScore: 4 },
  { id: 12, surname: 'Ivanova', name: 'Ira', patronymic: 'Ivanovna', dateBirth: new Date(1997, 6,13 ), avgScore: 5 },
  { id: 13, surname: 'Petrov', name: 'Roman', patronymic: 'Petrovich', dateBirth: new Date(1997, 2,2 ), avgScore: 3 }
];
