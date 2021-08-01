<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: `BaseButton`,
  props: {
    tag: {
      default: `button`,
      type: String,
    },
    variant: {
      default: `primary`,
      type: String,
    },
  },
});

</script>

<template>
  <Component
    :is="tag"
    class="BaseButton"
    :class="`BaseButton--variant-${variant}`"
  >
    <slot />
  </Component>
</template>

<style lang="scss">
.BaseButton {
  display: inline-flex;
  align-items: center;
  transition-duration: $duration-200;
  transition-property: background-color, border-color, color;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.5em;
  cursor: pointer;
  padding-right: $spacing-xl;
  padding-left: $spacing-xl;
  min-height: $height-form-control;
  text-decoration: none;

  &,
  &:visited {
    color: $color-primary-contrast;
  }

  &--variant-primary {
    border-color: $color-primary;
    background-color: $color-primary;

    &:hover,
    &:focus {
      border-color: $color-primary-light;
      background-color: $color-primary-light;
    }
  }

  &--variant-secondary {
    border-color: $color-primary;
    background-color: transparent;

    &,
    &:visited {
      color: $color-primary;
    }

    &:hover,
    &:focus {
      border-color: $color-primary-light;
      background-color: $color-primary-light;
      color: $color-primary-contrast;
    }
  }
}
</style>
