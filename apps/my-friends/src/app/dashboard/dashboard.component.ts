import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersReportUserFormComponent } from './users/report/users-report-user-form/users-report-user-form.component';
import { UsersReportGraphsComponent } from './users/report/users-report-graphs/users-report-graphs.component';

@Component({
  standalone: true,
  selector: 'wyn-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    UsersReportUserFormComponent,
    UsersReportGraphsComponent,
  ],
})
export class DashboardComponent {}
