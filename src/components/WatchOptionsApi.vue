<template>
  <div>
    <BaseStack>
      <h2>WatchOptionsApi</h2>
      <div>
        {{ count }}
      </div>
      <div>
        <BaseButton @click="plusOne">
          +1
        </BaseButton>
      </div>
    </BaseStack>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BaseButton from './BaseButton.vue';
import BaseStack from './BaseStack.vue';

export default defineComponent({
  components: {
    BaseButton,
    BaseStack,
  },
  data() {
    return {
      count: 0,
    };
  },
  watch: {
    count(newValue, oldValue) {
      console.log({ newValue, oldValue });
    },
  },
  methods: {
    plusOne() {
      this.count += 1;
    },
  },
});
</script>
