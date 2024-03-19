import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorizontalBarChartCardComponent } from './horizontal-bar-chart-card.component';
import { CommonMaterialModule } from '@wyn/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { input } from '@angular/core';
import { HorizontalBarChartDataPoint } from './horizontal-bar-chart-data-point.model';

describe('HorizontalBarChartCardComponent', () => {
  let component: HorizontalBarChartCardComponent;
  let fixture: ComponentFixture<HorizontalBarChartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonMaterialModule,
        NgxChartsModule,
        HorizontalBarChartCardComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalBarChartCardComponent);
    component = fixture.componentInstance;
    component.title = input<string>('Horizontal Bar Chart Card');
    component.xAxisLabel = input<string>('Age');
    component.yAxisLabel = input<string>('Name');
    component.results = input<HorizontalBarChartDataPoint[]>([
      {
        name: 'Tammy',
        value: 10,
      },
      {
        name: 'Evan',
        value: 15,
      },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
