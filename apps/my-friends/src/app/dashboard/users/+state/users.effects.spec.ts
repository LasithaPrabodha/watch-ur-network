/* eslint-disable @typescript-eslint/no-empty-function */
import { TestBed } from '@angular/core/testing';

import { EMPTY, Observable, of as observableOf, throwError } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { UsersEffects } from './users.effects';
import * as UsersActions from './users.actions';
import { Action } from '@ngrx/store';
import { UsersApiService } from '../services/users-api.service';
import { UserEntity } from '@wyn/ui-shared';
import { NotificationService } from '../../../core/services/notification-service/notification.service';
import { ForceDirectedGraph } from '@wyn/ui-chart-cards';
import { hot, cold } from 'jasmine-marbles';

describe('UsersEffects', () => {
  let actions$: Observable<Action>;
  let effects: UsersEffects;
  let usersApiService: UsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        { provide: UsersApiService, useClass: MockUsersApiService },
        { provide: NotificationService, useClass: MockNotificationService },
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UsersEffects);
    usersApiService = TestBed.inject(UsersApiService);
  });

  describe('fetchUsers$', () => {
    it('should trigger UserActions.usersFetchedFromUserReportsSuccess with result from getAllUsers()', () => {
      actions$ = hot('-a-|', { a: UsersActions.fetchUsersFromUserReports() });

      const users: UserEntity[] = [{}] as UserEntity[];
      jest.spyOn(usersApiService, 'getAllUsers').mockReturnValue(
        observableOf(users)
      );

      const expected = hot('-r-|', {
        r: UsersActions.usersFetchedFromUserReportsSuccess({ users }),
      });

      expect(effects.fetchUsers$).toBeObservable(expected);
    });

    it('should cancel the previous request for getAllUsers() if still pending', () => {
      actions$ = hot('-a-a-|', { a: UsersActions.fetchUsersFromUserReports() });
      const users: UserEntity[] = [{}] as UserEntity[];
      const apiResponse = cold('---b-|', { b: users });
      const getAllUsersSpy = jest.spyOn(
        usersApiService,
        'getAllUsers'
      ).mockReturnValue(apiResponse);

      const expected = hot('------r-|', {
        r: UsersActions.usersFetchedFromUserReportsSuccess({ users }),
      });
      expect(effects.fetchUsers$).toBeObservable(expected);
      expect(getAllUsersSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('fetchFriendsGraph$', () => {
    it('should trigger UsersActions.friendsGraphFetchedFromUserReportsSuccess with result from getFriendsGraph()', () => {
      actions$ = hot('-a-|', {
        a: UsersActions.fetchFriendsGraphFromUserReports(),
      });

      const friendsGraph: ForceDirectedGraph = {} as ForceDirectedGraph;
      jest.spyOn(usersApiService, 'getFriendsGraph').mockReturnValue(
        observableOf(friendsGraph)
      );

      const expected = hot('-r-|', {
        r: UsersActions.friendsGraphFetchedFromUserReportsSuccess({
          friendsGraph,
        }),
      });
      expect(effects.fetchFriendsGraph$).toBeObservable(expected);
    });
  });

  describe('requestAddUser$', () => {
    let notificationService: NotificationService;
    beforeEach(() => {
      notificationService = TestBed.inject(NotificationService);
    });

    it('should trigger UsersActions.userAddedFromUserReportsSuccess with success result from addUser()', () => {
      const user: UserEntity = {
        name: 'Jasmine',
      } as UserEntity;
      actions$ = hot('-r-|', {
        r: UsersActions.requestAddUserFromUserReports({ user }),
      });

      jest.spyOn(usersApiService, 'addUser').mockReturnValue(observableOf(user));

      const showSuccessToastSpy = jest.spyOn(
        notificationService,
        'showSuccessToast'
      );

      const expected = hot('-r-|', {
        r: UsersActions.userAddedFromUserReportsSuccess({ user }),
      });
      expect(effects.requestAddUser$).toBeObservable(expected);
      expect(showSuccessToastSpy).toHaveBeenCalledWith(
        `User '${user.name}' added successfully`
      );
    });

    it('should trigger UsersActions.userAddedFromUserReportsFailed with error result from addUser()', () => {
      const user: UserEntity = {
        name: 'Jasmine',
      } as UserEntity;
      actions$ = hot('-r-|', {
        r: UsersActions.requestAddUserFromUserReports({ user }),
      });

      const errorMessage = 'Jasmine is already a user';
      const error: Error = new Error(errorMessage);
      jest.spyOn(usersApiService, 'addUser').mockReturnValue(throwError(error));

      const showErrorToastSpy = jest.spyOn(notificationService, 'showErrorToast');

      const expected = hot('-r-|', {
        r: UsersActions.userAddedFromUserReportsFailed({ error: errorMessage }),
      });
      expect(effects.requestAddUser$).toBeObservable(expected);
      expect(showErrorToastSpy).toHaveBeenCalledWith(
        `User '${user.name}' add failed: ${errorMessage}`
      );
    });
  });
});

class MockNotificationService {
  showSuccessToast() {}

  showErrorToast() {}
}

class MockUsersApiService {
  getAllUsers() {
    return EMPTY;
  }

  getFriendsGraph() {
    return EMPTY;
  }

  addUser() {
    return EMPTY;
  }
}
