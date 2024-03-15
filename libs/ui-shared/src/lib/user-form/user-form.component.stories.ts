import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { UserFormComponent } from './user-form.component';
import { UserEntity } from '../../models/user-entity.model';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@wyn/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object } from '@storybook/addon-knobs';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormState } from '../../models/form-state.enum';
import { input } from '@angular/core';

const mockAllUsers: UserEntity[] = [
  {
    name: 'abc',
    age: 12,
    weight: 34,
    friendNames: ['def'],
  },
  {
    name: 'def',
    age: 89,
    weight: 77,
    friendNames: ['abc'],
  },
];

const meta: Meta<UserFormComponent> = {
  component: UserFormComponent,
  title: 'UserFormComponent',
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        CommonMaterialModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }),
  ],
  argTypes: {
    allUsers: object('allUsers', mockAllUsers),
    formState: input(FormState.READY),
  },
};

export default meta;
type Story = StoryObj<UserFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/user-form works!/gi)).toBeTruthy();
  },
};
