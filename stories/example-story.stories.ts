import { data as API } from './mock-api.json'

import WpImage from '~/components/wp-image.vue'

export default {
    title: 'Example Story'
}

export const Default = () => ({
    components: { WpImage },
    data() {
        return {
            image: API.images.nodes[2]
        }
    },
    template: `
            <div>
                <wp-image :image='image'/>
            </div>
             `
})
