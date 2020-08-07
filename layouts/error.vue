<template>
    <section class="section section-404">
        <h2 v-if="error.statusCode === 404">
            Sorry the page could not be found.
        </h2>
        <h2 v-else>
            A {{ error.statusCode }} error occurred.
        </h2>

        <p
            v-if="error.message"
            v-text="error.message"
        />

        <nuxt-link to="/">
            Back to the home page
        </nuxt-link>
    </section>
</template>

<script>
export default {
    props: ["error"],
    head() {
        return {
            title: `${this.error.statusCode} Error`
        }
    },
    mounted() {
        console.log(this.error)
    }
}
</script>

<style lang="scss">
.section-404 {
    min-height: var(--unit-100vh);

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
}
</style>
