export type WpMenuResponse = {
    id: number
    title: string
    slug: string
    menu_order: number
    url: string
    target: string
    attr_title: string
    description: string
    classes: string[]
    xfn: string
    parent_id: number
    type: string
    uri: string
    to: string
    children?: WpMenuResponse[]
}

export type WpMenuItemProps = WpMenuResponse

export type WpMenuProps = {
    name: string
    items?: WpMenuItemProps[]
}
