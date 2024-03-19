import { Route } from '@angular/router';
import { NoContentComponent } from '@wyn/ui-shared';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NoContentComponent,
  },
];
