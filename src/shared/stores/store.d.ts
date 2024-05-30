import { RouteLocation } from "vue-router";

export type authState = {
  currentUser: User | null;
  redirectRoute: Partial<RouteLocation> | null;
}

export type authGetters = {
  isAuth(): boolean;
}

export type authActions = {
  loadUser(): void;
  clearUser(): void;
  saveRedirectRoute(route: Partial<RouteLocation>): void;
  loadRedirectRoute(): void;
  clearRedirectRoute(): void;
}

export type appState = {
  modalIsOpen: boolean;
}

export type appGetters = {
    getModalState(): boolean;
}

export type appActions = {
  setModalState(modalState: boolean): void;
}