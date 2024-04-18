<script setup lang="ts">
import Form from '../components/Form.vue'


</script>


<template>
  <div class="edit-wrapper">
    <h1 class="text-lg" :style="{ fontSize: '30px'}">Edit person</h1>
    <Form  />
  </div>
</template>
  
<style>
@media (min-width: 1024px) {
  .edit-wrapper {
    min-height: 100vh;
    display: block;
    align-items: center;
    padding: 1rem;
  }
}
</style>
  