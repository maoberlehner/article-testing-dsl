<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: `BaseText`,
  props: {
    fontSize: {
      default: `m`,
      type: String,
    },
    tag: {
      default: `span`,
      type: String,
    },
  },
});
</script>

<template>
  <Component
    :is="tag"
    class="BaseText"
    :class="`BaseText--font-size-${fontSize}`"
  >
    <slot />
  </Component>
</template>

<style lang="scss">
// https://seek-oss.github.io/capsize/
.BaseText {
  line-height: 28px;
  font-size: 16.8098px;

  &::before,
  &::after {
    display: table;
    content: '';
  }

  &::before {
    margin-bottom: -0.4772em;
  }

  &::after {
    margin-top: -0.4152em;
  }

  &--font-size-xl {
    line-height: 27px;
    font-size: 25.2148px;

    &::before {
      margin-bottom: -0.2095em;
    }

    &::after {
      margin-top: -0.1475em;
    }
  }
}
</style>
