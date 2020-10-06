---
name: Component Request
about: Use this to define a component that a developer can build.
title: Component Request - {componentName} - {x}hrs
labels: ""
assignees: ""
---

## Component Description

This component is used {where} to display {what}. Be sure to explain any variants or hover states.

## Design

Please also see attached screenshots for quick reference.

-   Desktop: https://xd.adobe.com/view/1234-5678/
-   Mobile: https://xd.adobe.com/view/1234-5678/

If no mobile designs provided, please use your best judgment for responsiveness.

## Slots

Name and description of any slots needed.

## Props

```
props: {
    exampleObject: {
        // Mock: api.page
        type: Object,
        default: () => {}
    },
    exampleArray: {
        // Mock: api.pages
        type: Array,
        default: () => []
    },
    exampleNumber: {
        type: Number,
        default: 0
    },
    exampleString: {
        type: String,
        default: ""
    },
    exampleBoolean: {
        type: Boolean,
        default: true
    }
}
```

## Developer Tips

List any developer tips here

1. `--color-example` for the font color

## Events

Describe any events that should be emitted by this component.

1. `menuOpened` when {something} is clicked on

## Required components

List out any components that are used by this new component. For example, if you are building a grid that is made up of block components.

1. `required-component` is used for {what}

## Screenshots

{attach screenshots}
