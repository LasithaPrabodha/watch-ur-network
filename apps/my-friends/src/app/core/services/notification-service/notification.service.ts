import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  private readonly snackBarSuccessConfig: MatSnackBarConfig =
    new MatSnackBarConfig();
  private readonly snackBarErrorConfig: MatSnackBarConfig =
    new MatSnackBarConfig();
  private readonly snackBarWarningConfig: MatSnackBarConfig =
    new MatSnackBarConfig();

  constructor(private snackBar: MatSnackBar) {
    this.snackBarSuccessConfig = this.getDefaultSnackBarConfig();
    this.snackBarSuccessConfig.panelClass = ['snackbar-success', 'snackbar'];

    this.snackBarErrorConfig = this.getDefaultSnackBarConfig();
    this.snackBarErrorConfig.panelClass = ['snackbar-error', 'snackbar'];

    this.snackBarWarningConfig = this.getDefaultSnackBarConfig();
    this.snackBarWarningConfig.panelClass = ['snackbar-warning', 'snackbar'];
  }

  showSuccessToast(message: string): void {
    this.showToast(message, this.snackBarSuccessConfig);
  }

  showErrorToast(message: string): void {
    this.showToast(message, this.snackBarErrorConfig);
  }

  showWarningToast(message: string): void {
    this.showToast(message, this.snackBarWarningConfig);
  }

  private getDefaultSnackBarConfig(): MatSnackBarConfig {
    const snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition = 'bottom';
    snackBarConfig.horizontalPosition = 'left';
    snackBarConfig.duration = 3000;
    return snackBarConfig;
  }

  private showToast(message: string, snackBarConfig: MatSnackBarConfig): void {
    this.snackBar.open(message, undefined, snackBarConfig);
  }
}
