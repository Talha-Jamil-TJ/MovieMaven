import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@features/list/list.component').then(({ ListComponent }) => ListComponent),
  },
  {
    path: 'detail',
    loadComponent: () => import('@features/detail/detail.component').then(({ DetailComponent }) => DetailComponent),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('@features/detail/detail.component').then(({ DetailComponent }) => DetailComponent),
  },
];
