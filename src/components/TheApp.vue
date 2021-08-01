<template>
  <BaseContainer style="padding-top: 4rem;padding-bottom: 4rem;">
    <BaseStack
      gap="4xl"
      tag="form"
      @submit.prevent="submit"
    >
      <h1>Add New Article</h1>
      <BaseStack
        tag="label"
        gap="xs"
      >
        Title
        <input
          v-model="title"
          data-qa="title field"
        >
        <p
          v-if="validationErrors.title"
          data-qa="validation error title"
        >
          Some Error!
        </p>
      </BaseStack>
      <BaseStack
        tag="label"
        gap="xs"
      >
        Body
        <textarea
          rows="10"
          data-qa="body field"
        />
      </BaseStack>
      <p
        v-if="status === 'success'"
        class="info info--success"
        data-qa="success info"
      >
        Success!
      </p>
      <p
        v-if="status === 'error'"
        class="info info--error"
        data-qa="error info"
      >
        Error!
      </p>
      <div class="actions">
        <BaseButton data-qa="submit button">
          Submit
        </BaseButton>
      </div>
    </BaseStack>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import BaseButton from './BaseButton.vue';
import BaseContainer from './BaseContainer.vue';
import BaseStack from './BaseStack.vue';

export default defineComponent({
  name: `App`,
  components: {
    BaseButton,
    BaseContainer,
    BaseStack,
  },
  setup() {
    let title = ref(``);
    let body = ref(``);
    let validationErrors = ref({
      title: false,
    });
    let status = ref(`idle`);

    let validate = () => {
      if (title.value) return true;
      validationErrors.value.title = true;
      return false;
    };

    let submit = async () => {
      if (!validate()) return;

      let response = await fetch(`/api/articles`, {
        method: `POST`,
        body: JSON.stringify({ title: title.value, body: body.value }),
      });
      if (response.ok) {
        status.value = `success`;
      } else {
        status.value = `error`;
      }
    };

    return {
      body,
      status,
      submit,
      title,
      validationErrors,
    };
  },
});
</script>

<style lang="scss">
h1 {
  font-size: 2.5rem;
  font-weight: 700;
}

input,
textarea {
  border: 1px solid #888;
  border-radius: 0.25rem;
  padding: 0.5rem;
}

.info {
  border: 1px solid;
  border-radius: 0.5rem;
  padding: 1rem;

  &--success {
    border-color: green;
    background-color: lightgreen;
    color: green;
  }

  &--error {
    border-color: red;
    background-color: lightcoral;
    color: red;
  }
}
</style>
