<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: `BaseProse`,
  props: {
    html: {
      default: undefined,
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
    v-if="html"
    class="BaseProse"
    v-html="html"
  />
  <Component
    :is="tag"
    v-else
    class="BaseProse"
  >
    <slot />
  </Component>
</template>

<style lang="scss">
.BaseProse {
  > :not(:last-child) {
    margin-bottom: $spacing-xl;
  }

  > * {
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
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 500;
  }

  h1,
  h2,
  h3 {
    &::before {
      margin-bottom: -0.2095em;
    }

    &::after {
      margin-top: -0.1475em;
    }
  }

  h1 {
    line-height: 48px;
    font-size: 44.8263px;
  }

  h2 {
    line-height: 39px;
    font-size: 36.4213px;
  }

  h3 {
    line-height: 27px;
    font-size: 25.2148px;
  }

  h1,
  h2,
  h3 {
    &:not(:last-child) {
      margin-bottom: $spacing-3xl;
    }
  }

  strong {
    font-weight: 500;
  }
}
</style>
