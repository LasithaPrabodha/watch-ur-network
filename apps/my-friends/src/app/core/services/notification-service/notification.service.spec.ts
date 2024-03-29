import { inject, TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';

describe('NotificationService', () => {
  class MockMatSnackBar {
    open(
      message: string,
      action?: string,
      config?: MatSnackBarConfig
    ): MatSnackBarRef<SimpleSnackBar> {
      return {} as MatSnackBarRef<SimpleSnackBar>;
    }
  }

  let mockMatSnackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        {
          provide: MatSnackBar,
          useClass: MockMatSnackBar,
        },
      ],
    });
    mockMatSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', inject(
    [NotificationService],
    (service: NotificationService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should trigger snack bar toast for showSuccessToast()', inject(
    [NotificationService],
    (service: NotificationService) => {
      const clearSessionSpy = jest.spyOn(mockMatSnackBar, 'open');
      const message = 'message';
      expect(service.showSuccessToast(message)).toBeUndefined();
      expect(clearSessionSpy).toHaveBeenCalled();
    }
  ));

  it('should trigger snack bar toast for showErrorToast()', inject(
    [NotificationService],
    (service: NotificationService) => {
      const clearSessionSpy = jest.spyOn(mockMatSnackBar, 'open');
      const message = 'message';
      expect(service.showErrorToast(message)).toBeUndefined();
      expect(clearSessionSpy).toHaveBeenCalled();
    }
  ));

  it('should trigger snack bar toast for showWarningToast()', inject(
    [NotificationService],
    (service: NotificationService) => {
      const clearSessionSpy = jest.spyOn(mockMatSnackBar, 'open');
      const message = 'message';
      expect(service.showWarningToast(message)).toBeUndefined();
      expect(clearSessionSpy).toHaveBeenCalled();
    }
  ));
});
