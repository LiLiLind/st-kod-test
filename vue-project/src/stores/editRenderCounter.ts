import { defineStore } from 'pinia'

//attempt to re-render Form to get new values

export const useEditRenderStore = defineStore('form', {
  state: () => ({
    triggerRefresh: false,
  }),
  actions: {
    toggleRefresh() {
      this.triggerRefresh = !this.triggerRefresh;
    }
  }
});