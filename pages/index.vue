<template>
    <div class="loading-message" v-if="$apollo.loading">
        Loading...
    </div>

    <section v-else :class="classes">
        {{ page }}
    </section>
</template>

<script>
import pageQuery from '~/queries/pages/GetPageByDevId.gql'
import { formatPageData } from '~/utils/formatters.js'

export default {
    data() {
        return {
            page: '',
            devId: 'front-page',
        }
    },
    computed: {
        classes() {
            return ['section', this.devId]
        },
    },
    apollo: {
        page: {
            query: pageQuery,
            variables() {
                return {
                    devId: this.devId,
                }
            },
            update(queryData) {
                return formatPageData(queryData)
            },
        },
    },
}
</script>

<style lang="scss">
@import '~/styles/_vars.scss';

.container {
    color: $black;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
