<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: `BaseGridItem`,
  props: {
    width: {
      default: () => [`12/12`],
      type: Array,
    },
    tag: {
      default: `div`,
      type: String,
    },
  },
});
</script>

<template>
  <Component
    :is="tag"
    class="BaseGridItem"
    :class="width.map(width => `BaseGridItem--width-${width}`)"
  >
    <slot />
  </Component>
</template>

<style lang="scss">
.BaseGridItem {
  &--width-12\/12 {
    width: 100%;
  }

  @media (min-width: $breakpoint-m) {
    &--width-4\/12\@m {
      width: 33.33333333%;
    }
  }

  @media (min-width: $breakpoint-m) {
    &--width-8\/12\@m {
      width: 66.6666666%;
    }
  }

  @media (min-width: $breakpoint-m) {
    &--width-6\/12\@m {
      width: 50%;
    }
  }
}
</style>
