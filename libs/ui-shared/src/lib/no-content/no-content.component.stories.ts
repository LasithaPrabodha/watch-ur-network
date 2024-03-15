import type { Meta, StoryObj } from '@storybook/angular';
import { NoContentComponent } from './no-content.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<NoContentComponent> = {
  component: NoContentComponent,
  title: 'NoContentComponent',
};
export default meta;
type Story = StoryObj<NoContentComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/no-content works!/gi)).toBeTruthy();
  },
};
