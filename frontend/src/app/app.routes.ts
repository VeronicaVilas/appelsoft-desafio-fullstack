import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateComponent } from './features/create/create.component';
import { inject } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './features/edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'resumo',
    component:ListComponent
  },
  {
    path: 'create-product',
    loadComponent: () =>
      import('./features/create/create.component').then(
        (m) => m.CreateComponent
      ),
  },
  {
    path: 'editar-transacao/:id',
    component: EditComponent
  }
];
