<template lang="html">
    <div :class="classes">
        <div class="items">
            <div
                v-for="block in parsedBlocks"
                class="video-block"
            >
                <wp-image
                    :key="block.image.id"
                    :image="block.image"
                    :aspect-ratio="56.25"
                    @click.native="emitObj(block)"
                >
                    <img
                        v-if="block.logo"
                        :src="block.logo.src"
                        :src-set="block.logo.srcSet"
                        class="logo"
                    >
                </wp-image>
                <split-text
                    class="title"
                    :text="block.title"
                />
                <h4
                    class="credits"
                    v-html="block.credits"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            default: () => [],
        },
        logos: {
            type: Array,
            default: () => [],
        },
        items: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        classes() {
            return ["gutenberg-video-thumbtray", "margin-section"]
        },
        parsedBlocks() {
            return this.items.map((obj, i) => {
                return {
                    ...obj,
                    image: this.filterById(this.images, obj.imageId),
                    logo: this.filterById(this.logos, obj.secondaryImageId),
                }
            })
        },
    },
    methods: {
        emitObj(obj) {
            this.$emit("event", obj)
        },
        filterById(arr, id) {
            return arr.find((obj) => {
                return obj.databaseId.toString() === id
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.gutenberg-video-thumbtray {
    position: relative;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow-x: scroll;
    flex: 1;
    display: flex;

    // Hides scroll bar, but keeps functionality
    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;

    .items {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-content: center;
        align-items: center;
        overflow-x: scroll;
        min-width: min-content;
        width: 100%;
    }

    .video-block {
        position: relative;
        min-width: 530px;
        height: auto;
        margin-right: 20px;
        cursor: pointer;
    }
    /deep/ .logo {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100px;
        height: auto;
    }
    /deep/ .title .line {
        display: block;
        margin: 15px 0;
        font-family: var(--font-secondary);
        &.line-1 {
            font-size: 18px;
            line-height: 23px;
            font-weight: 500;
        }
        &.line-2 {
            font-size: 12px;
            line-height: 15px;
        }
    }
    .credits {
        margin: 13px 0;
        font-size: 15px;
        line-height: 19px;
    }

    // Breakpoints
    @media #{$gt-cinema} {
        .video-block {
            min-width: 750px;
        }

        /deep/ .title .line {
            &.line-1 {
                font-size: 24px;
                line-height: 30px;
            }
            &.line-2 {
                font-size: 14px;
                line-height: 18px;
            }
        }

        .credits {
            margin: 15px 0;
            font-size: 20px;
            line-height: 25px;
        }
    }
    @media #{$lt-phone} {
        /deep/ .logo {
        }
    }
}
</style>
