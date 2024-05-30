import { defineStore } from "pinia";
import { appState, appActions, appGetters } from "@/shared/stores/store";

export const useAppStore = defineStore<'appState', appState, appGetters, appActions>('appState', {
  state()  {
    return {
      modalIsOpen: false
    }
  },
  getters: {
    getModalState(): boolean {
      return this.modalIsOpen
    }
  },
  actions: {
    setModalState(modalState: boolean) {
      this.modalIsOpen = modalState
    }
  }
})