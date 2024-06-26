import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbar, DashboardComponent],
  selector: 'wyn-root',
  template: `
    <header>
      <mat-toolbar color="primary">
        <h1>My Friends</h1>
      </mat-toolbar>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: `
   .dashboard-container {
      min-width: 400px;
    }

    main {
      padding: 5px 15px;
      max-width: 900px;
      margin: 0 auto;
    }
`,
})
export class AppComponent {}
