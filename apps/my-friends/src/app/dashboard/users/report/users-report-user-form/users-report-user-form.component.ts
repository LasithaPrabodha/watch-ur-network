import { Component } from '@angular/core';
import { FormState, UserEntity, UserFormComponent } from '@wyn/ui-shared';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UsersSelectors from '../../+state/users.selectors';
import * as UsersActions from '../../+state/users.actions';
import { AppState } from '../../../../core/ngrx/app.state';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'wyn-users-report-user-form',
  templateUrl: './users-report-user-form.component.html',
  styleUrls: ['./users-report-user-form.component.scss'],
  imports: [AsyncPipe, UserFormComponent],
})
export class UsersReportUserFormComponent {
  allUsers$: Observable<UserEntity[]>;
  formState$: Observable<FormState>;

  constructor(private readonly store: Store<AppState>) {
    this.allUsers$ = this.store.pipe(select(UsersSelectors.selectUsers));
    this.formState$ = this.store.pipe(select(UsersSelectors.selectFormState));
  }

  onUserSaved(user: UserEntity): void {
    this.store.dispatch(UsersActions.requestAddUserFromUserReports({ user }));
  }
}
