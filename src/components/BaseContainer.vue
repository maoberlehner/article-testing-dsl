<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: `BaseContainer`,
  props: {
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
    class="BaseContainer"
  >
    <slot />
  </Component>
</template>

<style lang="scss">
.BaseContainer {
  margin-right: auto;
  margin-left: auto;
  padding-right: $spacing-m;
  padding-left: $spacing-m;
  max-width: 76em;
}
</style>
