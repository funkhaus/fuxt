<template lang="html">
    <header v-if="isLoggedIn" class="wp-controls">
        <a class="link" :href="adminUrl">Dashboard</a>
        <a v-if="hasPost" class="link" :href="newPostUrl">+New Post</a>
        <a v-if="hasPage" class="link" :href="newPageUrl">+New Page</a>
        <a v-if="editUrl" class="link" :href="editUrl"> Edit {{ postType }} </a>

        <a class="user link" :href="userUrl">
            <span class="greeting">Hello</span> {{ userDisplayName }}
        </a>
    </header>
</template>

<script>
import WP_CONTROLS from "~/gql/queries/WpControls"
import _get from "lodash/get"

export default {
    props: {
        path: {
            type: String,
            default: "",
        },
        hasPost: {
            type: Boolean,
            default: true,
        },
        hasPage: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            data: {},
            user: {},
        }
    },
    async fetch() {
        try {
            const data = await this.$graphql.default.request(
                WP_CONTROLS,
                {
                    uri: this.parsedUri,
                },
                { Preview: true }
            )
            this.data = _get(data, "nodeByUri", {}) || {}
            this.user = _get(data, "viewer", {}) || {}
        } catch (e) {
            console.warn("<wp-controls> Fetch Error:", this.parsedUri, e)
        }
    },
    head() {
        return {
            // This is used to style a gap at top of page.
            // Better than a class as it won't conflict with other head() html classes
            htmlAttrs: {
                "data-is-logged-in": this.isLoggedIn,
            },
        }
    },
    computed: {
        parsedUri() {
            let output = this.path
            if (!output) {
                output = this.$route.path
            }
            return output
        },
        adminUrl() {
            return `${this.$store.state.siteMeta.backendUrl}/wp-admin`
        },
        editUrl() {
            let output = `${this.adminUrl}/post.php?post=${this.data.databaseId}&action=edit`
            if (!this.data.databaseId) {
                output = ""
            }
            return output
        },
        isLoggedIn() {
            return Boolean(this.user.id) || false
        },
        newPostUrl() {
            return `${this.adminUrl}/post-new.php`
        },
        newPageUrl() {
            return `${this.adminUrl}/post-new.php?post_type=page`
        },
        userDisplayName() {
            return this.user.nicename || ""
        },
        userUrl() {
            return `${this.adminUrl}/profile.php`
        },
        postType() {
            return this.data.__typename || ""
        },
    },
    watch: {
        parsedUri() {
            if (this.isLoggedIn) {
                this.$fetch()
            }
        },
    },
    fetchKey(getCounter) {
        return `${this.parsedUri}-${getCounter(this.parsedUri)}`
    },
    fetchOnServer: false,
}
</script>

<style lang="scss">
html[data-is-logged-in="true"] {
    margin-top: 30px;
}
</style>

<style lang="scss" scoped>
.wp-controls {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;

    box-sizing: border-box;
    padding: 10px 15px;

    font-size: 10px;
    line-height: 1;

    background-color: var(--color-black, "#000000");
    color: var(--color-white, "#ffffff");

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;

    .link {
        margin-right: 10px;
        transition: opacity 0.4s;
    }
    .user {
        margin-left: auto;
        margin-right: 0;
    }

    // Hovers
    @media #{$has-hover} {
        .link:hover {
            opacity: 0.7;
        }
    }

    // Breakpoints
    @media #{$lt-phone} {
        padding: 10px;

        .greeting {
            display: none;
        }
    }
}
</style>
