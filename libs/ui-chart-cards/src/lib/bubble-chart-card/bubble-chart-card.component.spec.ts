import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BubbleChartCardComponent } from './bubble-chart-card.component';
import { CommonMaterialModule } from '@wyn/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { input } from '@angular/core';
import { BubbleChartDataPoint } from './bubble-chart-data-point.model';

describe('BubbleChartCardComponent', () => {
  let component: BubbleChartCardComponent;
  let fixture: ComponentFixture<BubbleChartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BubbleChartCardComponent],
      imports: [NoopAnimationsModule, CommonMaterialModule, NgxChartsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChartCardComponent);
    component = fixture.componentInstance;
    component.title = input<string>('Bubble Chart Card');
    component.xAxisLabel = input<string>('Age');
    component.yAxisLabel = input<string>('Weight');
    component.results = input<BubbleChartDataPoint[]>([
      {
        name: '',
        series: [
          {
            name: 'Tammy',
            x: 10,
            y: 20,
            r: 5,
          },
          {
            name: 'Evan',
            x: 15,
            y: 25,
            r: 15,
          },
        ],
      },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
