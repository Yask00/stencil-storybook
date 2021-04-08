import React from 'react';
import Button from '../../../dist/collection/components/button/button';

export default {
  title: 'Atoms/Button',
//   component: Button,
  argTypes: {
    type: { 
        type: 'text', 
        description: 'The text for the type property',
        // defaultValue: { summary: false },
    },

  },
};

const primaryArgs = {
  type: 'primary',
};

const secondaryArgs = {
    type: 'secondary',
};

const Template = args => {
    // visual view in canvas tab
  return <my-button {...args}>Button text</my-button>;
};

export const Primary = Template.bind({});
Primary.args = { ...primaryArgs };

export const Secondary = Template.bind({});
Secondary.args = { ...secondaryArgs };