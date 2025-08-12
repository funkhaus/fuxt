import { data as API } from './mock-api.json'

import WpImage from '~/components/wp-image.vue'

export default {
    title: 'Images'
}

export const Default = () => ({
    components: { WpImage },
    data() {
        return {
            images: API.images.nodes
        }
    },
    template: `
        <div class="images-showcase">
            <h2>Images Showcase</h2>
            <div class="images-grid">
                <div v-for="image in images" :key="image.id" class="image-item">
                    <wp-image :image="image" />
                    <div class="image-info">
                        <h3>{{ image.title }}</h3>
                        <p>{{ image.alt }}</p>
                        <p>Dimensions: {{ image.width }} x {{ image.height }}</p>
                    </div>
                </div>
            </div>
        </div>
    `
})
