import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForceDirectedGraph } from '@wyn/ui-chart-cards';
import { takeUntil } from 'rxjs/operators';
import { UserEntity } from '@wyn/ui-shared';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as UsersActions from '../../state/users.actions';
import * as UsersSelectors from '../../state/users.selectors';
import { AppState } from '../../../../core/ngrx/app.state';

@Component({
  selector: 'wyn-users-report-graphs',
  templateUrl: './users-report-graphs.component.html',
  styleUrls: ['./users-report-graphs.component.scss'],
})
export class UsersReportGraphsComponent implements OnInit, OnDestroy {
  friendsGraph$: Observable<ForceDirectedGraph>;

  private allUsers$: Observable<UserEntity[]>;

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly store: Store<AppState>) {
    this.allUsers$ = this.store.pipe(select(UsersSelectors.selectUsers));
    this.friendsGraph$ = this.store.pipe(
      select(UsersSelectors.selectFriendsGraph)
    );
  }

  ngOnInit(): void {
    this.initListenForUsersChange();

    this.store.dispatch(UsersActions.fetchUsersFromUserReports());
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initListenForUsersChange(): void {
    this.allUsers$.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: this.handleUsersChange.bind(this),
    });
  }

  private handleUsersChange(users: UserEntity[]): void {
    // Re-fetch the friendsGraph
    this.store.dispatch(UsersActions.fetchFriendsGraphFromUserReports());
  }
}
