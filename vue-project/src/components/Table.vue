<script setup lang="ts">
import { usePersonsListStore } from '../stores/personList'
import EditButton from './EditButton.vue';
import { defineComponent } from 'vue'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const personsListStore = usePersonsListStore();

defineComponent({
  setup(){
    const persons = usePersonsListStore();

    return {persons}
  }
})


</script>

<template>
    <div class="table-wrapper">
        <table>
            <tr>
                <th>First name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Registerd</th>
                <th></th>
            </tr>
            <tr v-for="(person, i) in personsListStore.personsList" :key="i">
                <td>{{ person.firstName }}</td>
                <td>{{ person.lastName }}</td>
                <td>{{ person.email }}</td>
                <td>{{ person.registeredAt.getDate() + " " + monthNames[person.registeredAt.getMonth()] + " " + person.registeredAt.getFullYear()}}</td>
                <td><EditButton :person="person"/></td>
            </tr>
        </table>
    </div>
</template>

<style scoped>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  overflow-y:scroll;
   height:600px;
   display:block;
   padding-bottom: 1rem;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #4a4545;
}
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.table-wrapper{
    height: 80%;
}

</style>
