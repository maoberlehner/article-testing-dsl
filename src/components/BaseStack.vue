<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: `BaseStack`,
  props: {
    direction: {
      default: `vertical`,
      type: String,
    },
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
    class="BaseStack"
    :class="[
      `BaseStack--direction-${direction}`,
      `BaseStack--gap-${gap}`,
    ]"
  >
    <slot />
  </Component>
</template>

<style lang="scss">
.BaseStack {
  display: flex;
  flex-wrap: wrap;

  &--direction-vertical {
    flex-direction: column;
  }

  &--gap-xs {
    gap: $spacing-xs;
  }

  &--gap-s {
    gap: $spacing-s;
  }

  &--gap-m {
    gap: $spacing-m;
  }

  &--gap-l {
    gap: $spacing-l;
  }

  &--gap-xl {
    gap: $spacing-xl;
  }

  &--gap-2xl {
    gap: $spacing-2xl;
  }

  &--gap-3xl {
    gap: $spacing-3xl;
  }

  &--gap-4xl {
    gap: $spacing-4xl;
  }
}
</style>
