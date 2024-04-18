<script setup lang="ts">
import Table from '../components/Table.vue'

</script>

<template>
  <main>
    <div class="home-view-wrapper">
      <h1 class="text-lg" :style="{ fontSize: '30px'}">Person List</h1>
      <RouterLink to="/addPerson">Add person</RouterLink>
      <Table />
    </div>
  </main>
</template>

<style scoped>

.home-view-wrapper{
  padding: 1rem;
}
</style>
