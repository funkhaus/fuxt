import type { Meta, StoryObj } from '@storybook/vue3'

import FunkyImage from './FunkyImage.vue'

const meta = {
  title: 'FunkyImage',
  component: FunkyImage,

  tags: ['autodocs']
} satisfies Meta<typeof FunkyImage>

export default meta
type Story = StoryObj<typeof meta>

export const FunkyImageStory: Story = {
  args: {
    image: {
      src: 'https://placehold.co/600x400/EEE/31343C'
    }
  },
  render(args) {
    return {
      components: { FunkyImage },
      setup: () => ({ args }),

      template: '<FunkyImage v-bind="args" />'
    }
  }
}
