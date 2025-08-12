import { data as API } from './mock-api.json'

export default {
    title: 'Menu'
}

export const Default = () => ({

    data() {
        return {
            menuItems: API.menu.nodes
        }
    },
    template: `
        <div class="menu-showcase">
            <h2>Menu Showcase</h2>
            <div>
                <div v-for="item in menuItems" :key="item.id">
                    <div>{{ item.title }}</div>
                    <div v-if="item.children && item.children.length > 0">
                        <div style="padding-left: 1rem;" v-for="child in item.children" :key="child.id">
                            <div>{{ child.title }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
