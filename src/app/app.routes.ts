import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./card-flip/card-flip.component').then(c => c.CardFlipComponent) },
];
