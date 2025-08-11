/** @type { import('storybook-vue').StorybookConfig } */
const config = {
    stories: [
        '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
        '../stories/**/*.@(js|jsx|ts|tsx|mdx)'
    ],
    framework: {
        name: '@storybook-vue/nuxt',
        options: {}
    },
    docs: {
        autodocs: 'tag'
    }
}
export default config
