<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: `BaseGrid`,
  props: {
    gap: {
      default: `m`,
      type: String,
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
    class="BaseGrid"
    :class="`BaseGrid--gap-${gap}`"
  >
    <slot />
  </Component>
</template>

<style lang="scss">
.BaseGrid {
  display: flex;
  flex-wrap: wrap;
  margin-top: -$spacing-m;
  margin-left: -$spacing-m;

  &--gap-m > * {
    padding-top: $spacing-m;
    padding-left: $spacing-m;
  }
}
</style>
