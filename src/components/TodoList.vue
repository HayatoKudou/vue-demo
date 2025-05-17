<template>
  <div>
    <h2>API Example</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h3>Todos</h3>
      <pre>{{ todos }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Api } from '../api/generated/client';

const loading = ref(true);
const error = ref<string | null>(null);
const todos = ref<any>(null);

onMounted(async () => {
  try {
    const api = new Api();
    todos.value = await api.getTodos();
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred';
  } finally {
    loading.value = false;
  }
});
</script> 