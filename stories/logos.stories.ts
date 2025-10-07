import { data as API } from './mock-api.json'

import WpImage from '~/components/wp-image.vue'

export default {
    title: 'Logos'
}

export const Default = () => ({
    components: { WpImage },
    data() {
        return {
            logos: API.logos.nodes
        }
    },
    template: `
        <div class="logos-showcase">
            <h2>Logos Showcase</h2>
            <div class="logos-grid">
                <div v-for="logo in logos" :key="logo.id" class="logo-item">
                    <img :src="logo.src" />
                    <div class="logo-info">
                        <h3>{{ logo.title }}</h3>
                        <p>Type: {{ logo.mimeType }}</p>
                    </div>
                </div>
            </div>
        </div>
    `
})
