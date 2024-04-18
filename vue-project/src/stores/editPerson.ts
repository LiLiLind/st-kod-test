import { defineStore } from 'pinia'

interface Person {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    registeredAt: Date;
}

const PERSON: Person = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    registeredAt: new Date(),
};

export const useEditPersonStore = defineStore('editPerson', {
    state: () => ({
        personToEdit: PERSON
    }),

    getters: {
        getPersonToEdit: (state) => {
            return state.personToEdit;
        }
    },
    actions: {
        setEditPerson(person: Person) {
            this.personToEdit = person;
        }
    },
})