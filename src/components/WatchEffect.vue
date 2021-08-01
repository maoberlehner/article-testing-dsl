<template>
  <div>
    <BaseStack>
      <h2>WatchEffect</h2>
      <div>
        Count A: {{ countA }}<br>
        Count B: {{ countB }}<br>
        A and B: {{ countAB }}
      </div>
      <div>
        <BaseButton @click="plusOneA">
          A +1
        </BaseButton>
        <BaseButton @click="plusOneB">
          B +1
        </BaseButton>
      </div>
    </BaseStack>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
  watchEffect,
} from 'vue';

import BaseButton from './BaseButton.vue';
import BaseStack from './BaseStack.vue';

export default defineComponent({
  components: {
    BaseButton,
    BaseStack,
  },
  setup() {
    let countA = ref(0);
    let plusOneA = () => {
      countA.value += 1;
    };

    let countB = ref(0);
    let plusOneB = () => {
      countB.value += 1;
    };

    // watch([countA, countB], () => console.log(countA.value, countB.value));

    let countAB = computed(() => countA.value + countB.value);

    watchEffect(() => console.log(countA.value, countB.value));

    return {
      countA,
      countAB,
      countB,
      plusOneA,
      plusOneB,
    };
  },
});
</script>
