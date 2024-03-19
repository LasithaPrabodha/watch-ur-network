import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';

import { chartColorScheme } from '../chart-color-scheme';

import { BubbleChartDataPoint } from './bubble-chart-data-point.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonMaterialModule } from '@wyn/material';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'wyn-bubble-chart-card',
  templateUrl: './bubble-chart-card.component.html',
  styleUrls: ['./bubble-chart-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CommonMaterialModule, NgxChartsModule],
})
export class BubbleChartCardComponent {
  @Input() title!: string;
  @Input() xAxisLabel!: string;
  @Input() yAxisLabel!: string;
  @Input() results!: BubbleChartDataPoint[];

  // Options
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showGridLines = true;

  colorScheme = chartColorScheme;
}
