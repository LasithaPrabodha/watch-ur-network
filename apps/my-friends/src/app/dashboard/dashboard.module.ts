import { NgModule } from '@angular/core';
import { UsersReportGraphsComponent } from './users/report/users-report-graphs/users-report-graphs.component';
import { UsersReportUserFormComponent } from './users/report/users-report-user-form/users-report-user-form.component';
import { UsersReportComponent } from './users/report/users-report.component';
import { ForceDirectedGraphComponent } from '@wyn/ui-chart-cards';
import { UserFormComponent } from '@wyn/ui-shared';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    UsersReportComponent,
    UsersReportUserFormComponent,
    UsersReportGraphsComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    ForceDirectedGraphComponent,
    UserFormComponent,
  ],
})
export class DashboardModule {}
