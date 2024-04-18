<script setup lang="ts">
import { usePersonsListStore } from '../stores/personList'
import { useEditPersonStore } from '../stores/editPerson'
import { ref, computed, watch } from 'vue'
import { faker } from '@faker-js/faker';
import { useRoute } from 'vue-router';
import { useEditRenderStore } from '../stores/editRenderCounter'


interface Person {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    registeredAt: Date;
}


const personsListStore = usePersonsListStore();
const editPersonStore = useEditPersonStore();

let editPerson = ref<Person>(editPersonStore.getPersonToEdit);

const route = useRoute();
const path: string = route.path;

const renderStore = useEditRenderStore();

const triggerCount = computed(() => renderStore.triggerRefresh);

//attempt to re-render Form to get new values
watch(triggerCount, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        console.log('Form should re-render now');

        // (document.getElementById('firstName') as HTMLInputElement).value = editPerson.value.firstName;
        // (document.getElementById('lastName') as HTMLInputElement).value = editPerson.value.lastName;
        // (document.getElementById('email') as HTMLInputElement).value = editPerson.value.email;
        // You can place re-initialization logic here if needed
        editPerson = ref<Person>(editPersonStore.getPersonToEdit);
    }
});


function hideMessage(type: string): void {
    try {
        (document.getElementById(type) as HTMLInputElement).style.display = 'none';
    } catch (error) {
        console.log(error);
    }
   
}

function showMessage(type: string): void {
    try {
        (document.getElementById(type) as HTMLInputElement).style.display = 'block';
    } catch (error) {
        console.log(error);
    }
}

function handleSubmit(): void {
    try {
        const inputs: HTMLFormElement = (document.getElementById('personForm') as HTMLFormElement);
        const firstName: string = (document.getElementById(inputs[0].id) as HTMLInputElement).value;
        const lastName: string = (document.getElementById(inputs[1].id) as HTMLInputElement).value;
        const email: string = (document.getElementById(inputs[2].id) as HTMLInputElement).value;

        hideMessage("emailErrorMessage");
        hideMessage("firstNameErrorMessage");
        hideMessage("lastNameErrorMessage");

        const emailFormat = email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if (emailFormat && firstName.replace(/\s/g, "") && lastName.replace(/\s/g, "")) {
            if (path == '/addPerson') {
                hideMessage("addedMessage");
                const newPerson: Person = {
                    id: faker.string.uuid(),
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    registeredAt: new Date()
                }

                personsListStore.addPerson(newPerson);
                showMessage("addedMessage");
                
                (document.getElementById(firstName) as HTMLInputElement).value = "";
                (document.getElementById(lastName) as HTMLInputElement).value = "";
                (document.getElementById(email) as HTMLInputElement).value = "";
            }

            if (path == '/editPerson') {
                hideMessage("editedMessage");
                const editedPersonValues = {
                    id: editPerson.value.id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    registeredAt: editPerson.value.registeredAt
                }

                personsListStore.editPerson(editedPersonValues);
                showMessage("editedMessage");

            }
        } else {
            emailFormat ? "": showMessage("emailErrorMessage");
            firstName.replace(/\s/g, "")? "": showMessage("firstNameErrorMessage");
            lastName.replace(/\s/g, "") ? "": showMessage("lastNameErrorMessage");
            
        }

    } catch (error) {
        console.log(error);
    }

}

</script>


<template>
    <div class="form-wrapper">
        <form v-if="path == '/addPerson'" id="personForm">
            <p>First Name</p>
            <input type="text" id="firstNameForm" @input="hideMessage('addedMessage')" :style="{ color: 'black' }" />
            <p id=firstNameErrorMessage class="text-red-500" :style="{ display: 'none', color: 'red' }">Please enter field</p>
            <p>Last Name</p>
            <input type="text" id="lastNameForm" @input="hideMessage('addedMessage')" :style="{ color: 'black' }" />
            <p id=lastNameErrorMessage class="text-red-500" :style="{ display: 'none', color: 'red' }">Please enter field</p>
            <p>Email</p>
            <input type="text" id="emailForm" @input="hideMessage('addedMessage')" :style="{ color: 'black' }" />
            <p id=emailErrorMessage class="text-red-500" :style="{ display: 'none', color: 'red' }">Please enter valid email
            </p>
            <button @click.prevent="handleSubmit"
                :style="{ border: 'solid', borderColor: 'green', marginTop: '10px' }">Submit</button>
            <h3 id=addedMessage :style="{ display: 'none', fontSize: '20px' }">Person has been added!</h3>
        </form>
        
        <form v-else-if="path == '/editPerson'" id="personForm">
            <p>First Name</p>
            <input type="text" :value="editPerson.firstName" id="firstNameForm" @input="hideMessage('editedMessage')"
                :style="{ color: 'black' }" />
                <p id=firstNameErrorMessage class="text-red-500" :style="{ display: 'none', color: 'red' }">Please enter field</p>
            <p>Last Name</p>
            <input type="text" :value="editPerson.lastName" id="lastNameForm" @input="hideMessage('editedMessage')"
                :style="{ color: 'black' }" />
            <p id=lastNameErrorMessage class="text-red-500" :style="{ display: 'none', color: 'red' }">Please enter field</p>
            <p>Email</p>
            <input type="text" :value="editPerson.email" id="emailForm" @input="hideMessage('editedMessage')"
                :style="{ color: 'black' }" />
            <p id=emailErrorMessage class="text-red-500" :style="{ display: 'none', color: 'red' }">Please enter valid email</p>
            <button @click.prevent="handleSubmit"
                :style="{ border: 'solid', borderColor: 'green', marginTop: '10px' }">Submit</button>
            <h3 id=editedMessage :style="{ display: 'none', fontSize: '20px' }">Person has been updated!</h3>
        </form>
    </div>
</template>


  
<style>
input {
    width: 100%;
    padding: 1rem;
}

@media (min-width: 1024px) {
    .form-wrapper {
        min-height: 100vh;
        display: block;
        align-items: center;

    }
}</style>
  