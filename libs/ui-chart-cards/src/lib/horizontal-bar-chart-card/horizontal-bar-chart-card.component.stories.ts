import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@wyn/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HorizontalBarChartCardComponent } from './horizontal-bar-chart-card.component';
import { HorizontalBarChartDataPoint } from './horizontal-bar-chart-data-point.model';
import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular';
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
  render: (args: HorizontalBarChartCardComponent) => ({
    props: {
      ...args,
    },
    template: `<wyn-horizontal-bar-chart-card ${argsToTemplate(
      args
    )}></wyn-horizontal-bar-chart-card>`,
  }),
};

export default meta;
type Story = StoryObj<HorizontalBarChartCardComponent>;

export const Default: Story = {
  args: {
    title: 'User Weights',
    xAxisLabel: 'Weight',
    yAxisLabel: 'Name',
    results: mockHorizontalBarChartDataPoint,
  },
};
