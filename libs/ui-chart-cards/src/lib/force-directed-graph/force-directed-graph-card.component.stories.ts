import { object } from '@storybook/addon-knobs';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@wyn/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ForceDirectedGraphComponent } from './force-directed-graph.component';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  argsToTemplate,
} from '@storybook/angular';


const mockForceDirectedGraph = {
  links: [
    {
      source: 'Cwqrxslm',
      target: 'Ipc',
    },
    {
      source: 'Cwqrxslm',
      target: 'Hewkai',
    },
    {
      source: 'Ioxru',
      target: 'Ipc',
    },
    {
      source: 'Dvyd',
      target: 'Hewkai',
    },
    {
      source: 'Dvyd',
      target: 'Ioxru',
    },
    {
      source: 'Dvyd',
      target: 'Ipc',
    },
    {
      source: 'Dvyd',
      target: 'Cwqrxslm',
    },
    {
      source: 'Dhs',
      target: 'Ipc',
    },
    {
      source: 'Dhs',
      target: 'Ioxru',
    },
    {
      source: 'Dhs',
      target: 'Dvyd',
    },
    {
      source: 'Dhs',
      target: 'Hewkai',
    },
    {
      source: 'Dhs',
      target: 'Cwqrxslm',
    },
  ],
  nodes: [
    {
      value: 'Ipc',
    },
    {
      value: 'Hewkai',
    },
    {
      value: 'Cwqrxslm',
    },
    {
      value: 'Ioxru',
    },
    {
      value: 'Dvyd',
    },
    {
      value: 'Dhs',
    },
  ],
};

const meta: Meta<ForceDirectedGraphComponent> = {
  component: ForceDirectedGraphComponent,
  title: 'ForceDirectedGraphComponent',
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
  render: (args: ForceDirectedGraphComponent) => ({
    props: {
      ...args,
    },
    template: `<wyn-force-directed-graph-card ${argsToTemplate(
      args
    )}></wyn-force-directed-graph-card>`,
  }),
};

export default meta;
type Story = StoryObj<ForceDirectedGraphComponent>;

export const Default: Story = {
  args: {
    title: 'Friends Network',
    friendsGraph: object('friendsGraph', mockForceDirectedGraph),
  },
};
