import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './dashboard/users/+state/users.reducer';
import { UsersEffects } from './dashboard/users/+state/users.effects';
import { NotificationService } from './core/services/notification-service/notification.service';

export const appConfig: ApplicationConfig = {
  providers: [
    NotificationService,
    provideRouter(appRoutes),
    provideAnimations(),
    provideAnimationsAsync(),
    provideStore({
      users: usersReducer,
    }),
    provideEffects(UsersEffects),
  ],
};
