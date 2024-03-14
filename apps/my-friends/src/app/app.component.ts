import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import {
  FormState,
  UserEntity,
  UserFormComponent,
} from '@watch-ur-network/shared-ui';
import {  Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbar, UserFormComponent],
  selector: 'watch-ur-network-root',
  template: `
    <watch-ur-network-user-form
      #userForm
      [allUsers]="(allUsers$ | async) || []"
      [formState]="formState$ | async"
      (userSaved)="onUserSaved($event)"
    >
    </watch-ur-network-user-form>
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
export class AppComponent {
  allUsers$: Observable<UserEntity[]> = new Observable<UserEntity[]>();
  formState$: Observable<FormState> = new Observable<FormState>();

  constructor() {
    this.allUsers$ = new Observable<UserEntity[]>();
    this.formState$ = new Observable<FormState>();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onUserSaved(user: UserEntity): void {}
}
