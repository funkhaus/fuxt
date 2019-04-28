<template>
    <site-loading v-if="$apollo.loading" />

    <section v-else :class="classes">
        {{ page }}
    </section>
</template>

<script>
//import pageQuery from '~/queries/pages/GetPageByDevId.gql'

export default {
    computed: {
        classes() {
            return ['section', 'section-home']
        }
    }
    // apollo: {
    //     page: {
    //         query: pageQuery,
    //         variables() {
    //             return {
    //                 devId: this.devId
    //             }
    //         },
    //         update(data) {
    //             return data
    //         }
    //     }
    // }
}
</script>

<style lang="scss">
@import '~/styles/_vars.scss';

.section-home {
    color: $black;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
