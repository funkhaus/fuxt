<template lang="html">
  <component
    :is="element"
    :id="wpId"
    :class="classes"
    :style="styles"
    v-html="content"
  />
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 2
    },
    content: {
      type: String,
      default: ""
    },
    textColorCode: {
      type: String,
      default: ""
    },
    textAlign: {
      type: String,
      default: ""
    },
    backgroundColorCode: {
      type: String,
      default: ""
    },
    fontSize: {
      type: String,
      default: ""
    },
    wpId: {
      type: String,
      default: ""
    },
    wpClasses: {
      type: String,
      default: ""
    }
  },
  computed: {
    element() {
      return `h${this.level}`;
    },
    styles() {
      return {
        color: this.textColorCode,
        "text-align": this.textAlign,
        "background-color": this.backgroundColorCode,
        "font-size": this.fontSize
      };
    },
    classes() {
      return ["gutenberg-heading", `is-h${this.level}`, this.wpClasses];
    }
  }
};
</script>

<style lang="scss" scoped>
.gutenberg-heading {
}
</style>
