// Import fonts.css to load custom fonts for the Storybook preview
import './fonts.css'

const preview = {
    parameters: {
        layout: 'fullscreen', // Removes default Storybook padding
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
}

export default preview
