import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';

import { chartColorScheme } from '../chart-color-scheme';

import { HorizontalBarChartDataPoint } from './horizontal-bar-chart-data-point.model';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@wyn/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  standalone: true,
  selector: 'wyn-horizontal-bar-chart-card',
  templateUrl: './horizontal-bar-chart-card.component.html',
  styleUrls: ['./horizontal-bar-chart-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CommonMaterialModule, NgxChartsModule],
})
export class HorizontalBarChartCardComponent {
  title = input.required<string>();
  xAxisLabel = input.required<string>();
  yAxisLabel = input.required<string>();
  results = input.required<HorizontalBarChartDataPoint[]>();

  // Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showGridLines = true;

  colorScheme = chartColorScheme;
}
