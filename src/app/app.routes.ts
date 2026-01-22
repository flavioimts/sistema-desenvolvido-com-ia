import { Routes } from '@angular/router';
import { StudentsListComponent } from './students-list.component';
import { PetsListComponent } from './pets-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/alunos/listagem', pathMatch: 'full' },
  { path: 'alunos/listagem', component: StudentsListComponent },
  { path: 'pet/listagem', component: PetsListComponent }
];
