import { Routes } from '@angular/router';
import { StudentsListComponent } from './students-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/alunos/listagem', pathMatch: 'full' },
  { path: 'alunos/listagem', component: StudentsListComponent }
];
