import type { Meta, StoryObj } from '@storybook/vue3'

import BlockWork from './BlockWork.vue'

const meta = {
  title: 'BlockWork',
  component: BlockWork,

  tags: ['autodocs'],

  argTypes: {
    to: {
      control: 'text',
      description: 'The route to link to'
    },
    title: {
      control: 'text',
      description: 'The title of the component'
    }
  }
} satisfies Meta<typeof BlockWork>

export default meta
type Story = StoryObj<typeof meta>

export const BlockWorkStory: Story = {
  args: {
    to: '/',
    title: 'The Block',
    image: {
      src: 'https://placehold.co/600x400/EEE/31343C'
    }
  },
  render(args) {
    return {
      components: { BlockWork },
      setup: () => ({ args }),

      template: '<BlockWork v-bind="args" />'
    }
  }
}
