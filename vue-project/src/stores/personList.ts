import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker';

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  registeredAt: Date;
}

function createRandomUser(): Person {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    registeredAt: faker.date.past(),
  };
}

const persons: Person[] = faker.helpers.multiple(createRandomUser, {
  count: 20,
});

export const usePersonsListStore = defineStore('personList', {
  state: () => {
    return { personsList: persons }
  },

  actions: {
    addPerson(person: Person): Boolean {

      this.personsList.push(person);

      return true;
    },
    editPerson(values: Person): Boolean {

      const findPerson = this.personsList.find(t => t.id == values.id);
      console.log(findPerson)

      const personsIndex = this.personsList.findIndex(x => x.id == findPerson?.id);

      this.personsList[personsIndex].firstName = values.firstName;
      this.personsList[personsIndex].lastName = values.lastName;
      this.personsList[personsIndex].email = values.email;

      return true;

    }
  },
})