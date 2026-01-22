import { Routes } from '@angular/router';
import { StudentsListComponent } from './students-list.component';
import { PetsListComponent } from './pets-list.component';
import { ShopListComponent } from './shop-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/alunos/listagem', pathMatch: 'full' },
  { path: 'alunos/listagem', component: StudentsListComponent },
  { path: 'pet/listagem', component: PetsListComponent },
  { path: 'shop', redirectTo: '/shop/listagem', pathMatch: 'full' },
  { path: 'shop/listagem', component: ShopListComponent }
];
