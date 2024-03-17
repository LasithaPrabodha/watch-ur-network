import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { NoContentComponent } from '@wyn/ui-shared';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NoContentComponent,
  },
];
