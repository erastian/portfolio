import { RouteLocation } from "vue-router";

export type State = {
  currentUser: User | null;
  redirectRoute: Partial<RouteLocation> | null;
}

export type Getters = {
  isAuth(): boolean;
}

export type Actions = {
  loadUser(): void;
  clearUser(): void;
  saveRedirectRoute(route: Partial<RouteLocation>): void;
  loadRedirectRoute(): void;
  clearRedirectRoute(): void;
}