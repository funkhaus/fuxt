import { data as API } from "~/stories/mock-api.json"

export default {
    title: "WpComponents / Slideshow"
}

export const Default = () => ({
    data() {
        return {
            blocks: [
                {
                    name: "core/paragraph",
                    attributes: {
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        textAlign: "",
                        fontSize: "",
                        textColor: "",
                        backgroundColor: "",
                        dropCap: false,
                        wpId: "",
                        wpClasses: ""
                    }
                },
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
                                    ...API.images.nodes[1]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[2]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[3]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[4]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[5]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[6]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[7]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[8]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[9]
                                }
                            }
                        },
                        {
                            mediaItem: {
                                node: {
                                    ...API.images.nodes[1]
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
