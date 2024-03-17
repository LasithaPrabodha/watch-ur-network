import { object } from '@storybook/addon-knobs';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@wyn/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BubbleChartDataPoint } from './bubble-chart-data-point.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BubbleChartCardComponent } from './bubble-chart-card.component';
import { input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

const mockBubbleChartDataPoints: BubbleChartDataPoint[] = [
  {
    name: 'Ipc',
    series: [{ name: '', x: 4, y: 219, r: 0 }],
  },
  {
    name: 'Hewkai',
    series: [{ name: '', x: 20, y: 113, r: 0 }],
  },
  {
    name: 'Cwqrxslm',
    series: [{ name: '', x: 55, y: 57, r: 2 }],
  },
  {
    name: 'Ioxru',
    series: [{ name: '', x: 51, y: 49, r: 1 }],
  },
  {
    name: 'Dvyd',
    series: [{ name: '', x: 96, y: 202, r: 4 }],
  },
  {
    name: 'Dhs',
    series: [{ name: '', x: 99, y: 282, r: 5 }],
  },
];

const meta: Meta<BubbleChartCardComponent> = {
  component: BubbleChartCardComponent,
  title: 'BubbleChartCardComponent',
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        CommonMaterialModule,
        NgxChartsModule,
      ],
    }),
  ],
  argTypes: {
    title: input('Age vs Weight (# Friends)'),
    xAxisLabel: input('Age'),
    yAxisLabel: input('Weight'),
    results: object('results', mockBubbleChartDataPoints),
  },
};

export default meta;
type Story = StoryObj<BubbleChartCardComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
};
