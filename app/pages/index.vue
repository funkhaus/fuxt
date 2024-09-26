<template>
    <section class="page-home">
        Home page here
    </section>
</template>

<style scoped>
.page-home {
    min-height: 200vh;

    color: var(--color-black);
    /* margin: 0 auto; */
    /* min-height: var(--unit-100vh); */

    /* Hover states */
    /* @media #{$has-hover} {
         Hover styles would go here
    } */

    /* Breakpoints */
    @media (--lt-phone) {
        background-color: blue;
    }
}
</style>
