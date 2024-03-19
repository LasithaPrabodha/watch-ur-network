import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { CommonMaterialModule } from '@wyn/material';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersReportGraphsComponent } from './users/report/users-report-graphs/users-report-graphs.component';
import { UsersReportUserFormComponent } from './users/report/users-report-user-form/users-report-user-form.component';
import { UsersReportComponent } from './users/report/users-report.component';
import { initialUsersState } from './users/+state/users.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { UserFormComponent } from '@wyn/ui-shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonMaterialModule,
        UserFormComponent,
      ],
      declarations: [
        DashboardComponent,
        UsersReportComponent,
        UsersReportUserFormComponent,
        UsersReportGraphsComponent,
      ],
      providers: [provideMockStore({ initialState: initialUsersState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
