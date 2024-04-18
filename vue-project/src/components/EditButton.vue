<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useEditPersonStore } from '../stores/editPerson'
import { useEditRenderStore } from '../stores/editRenderCounter'

interface Person {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    registeredAt: Date;
}

const editPersonStore = useEditPersonStore();
const renderStore = useEditRenderStore();


const props = defineProps<{
    person: Person
}>();


const router = useRouter();

function handleEdit(): void {

    try {
        editPersonStore.setEditPerson(props.person);
    if (window.location.pathname != '/editPerson') {
        router.push('/editPerson');
    } else {
        //attempt to re-render Form to get new values
        renderStore.toggleRefresh();
    }
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <button @click="handleEdit()">Edit</button>
</template>

<style scoped></style>
