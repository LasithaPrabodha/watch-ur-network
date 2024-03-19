import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbar, DashboardComponent],
  selector: 'wyn-root',
  template: `
    <header>
      <mat-toolbar color="primary">
        <h1>My Friends</h1>
      </mat-toolbar>
    </header>
    <main>
      <wyn-dashboard />
    </main>
  `,
  styles: `
   .dashboard-container {
      min-width: 400px;
    }

    main {
      padding: 5px 15px;
    }
`,
})
export class AppComponent {}
