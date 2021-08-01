<template>
  <div>
    <BaseStack>
      <h2>WatchCompositionApi</h2>
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
import { defineComponent, ref, watch } from 'vue';

import BaseButton from './BaseButton.vue';
import BaseStack from './BaseStack.vue';

export default defineComponent({
  components: {
    BaseButton,
    BaseStack,
  },
  setup() {
    let count = ref(0);
    let plusOne = () => {
      count.value += 1;
    };
    watch(count, (newValue, oldValue) => console.log({ newValue, oldValue }));

    return {
      count,
      plusOne,
    };
  },
});
</script>
