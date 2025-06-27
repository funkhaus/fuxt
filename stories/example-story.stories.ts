import { data as API } from './mock-api.json'

import GlobalHamburger from '~/components/global-hamburger.vue'
import WpImage from '~/components/wp-image.vue'

export default {
    title: 'GlobalHamburger'
}

export const Default = () => ({
    components: { GlobalHamburger, WpImage },
    data() {
        return {
            image: API.images.nodes[5],
            isOpen: false
        }
    },
    template: `
            <div>
                <global-hamburger
                    :menu-opened='isOpen'
                    @toggle-menu='isOpen = !isOpen'
                />
                <wp-image :image='image'/>
            </div>
             `
})
