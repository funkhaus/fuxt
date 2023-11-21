import { data as API } from "~/stories/mock-api.json"

export default {
    title: "WpComponents / Slideshow"
}

export const Default = () => ({
    data() {
        return {
            blocks: [
                {
                    attributes: {
                        caption: "",
                        wpId: "",
                        wpClasses: "",
                        align: "",
                        size: "large",
                        widthPixels: ""
                    },
                    innerBlocks: [
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[0]
                                }
                            }
                        }
                    ],
                    name: "core/slideshow"
                },
                {
                    name: "core/paragraph",
                    attributes: {
                        content:
                            "Kajal has been named a winner at The One Club For Creativity's 2023 Young Guns competition.",
                        textAlign: "",
                        fontSize: "",
                        textColor: "",
                        backgroundColor: "",
                        dropCap: false,
                        wpId: "",
                        wpClasses: ""
                    }
                }
            ]
        }
    },
    template: ` 
    <wp-gutenberg
        id="content"
        :blocks="blocks"
    />`
})
