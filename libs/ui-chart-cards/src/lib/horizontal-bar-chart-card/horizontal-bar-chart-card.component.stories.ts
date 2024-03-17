import { object, text } from '@storybook/addon-knobs';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@wyn/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HorizontalBarChartCardComponent } from './horizontal-bar-chart-card.component';
import { HorizontalBarChartDataPoint } from './horizontal-bar-chart-data-point.model';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { input } from '@angular/core';

const mockHorizontalBarChartDataPoint: HorizontalBarChartDataPoint[] = [
  {
    name: 'Ipc',
    value: 219,
  },
  {
    name: 'Hewkai',
    value: 113,
  },
  {
    name: 'Cwqrxslm',
    value: 57,
  },
  {
    name: 'Ioxru',
    value: 49,
  },
  {
    name: 'Dvyd',
    value: 202,
  },
  {
    name: 'Dhs',
    value: 282,
  },
];

const meta: Meta<HorizontalBarChartCardComponent> = {
  component: HorizontalBarChartCardComponent,
  title: 'HorizontalBarChartCardComponent',
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
    title: input('User Weights'),
    xAxisLabel: input('Weight'),
    yAxisLabel: input('Name'),
    results: object('results', mockHorizontalBarChartDataPoint),
  },
};

export default meta;
type Story = StoryObj<HorizontalBarChartCardComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
};
