import { defineStore } from "pinia";
import { RouteLocation } from "vue-router";
import { supabase } from "@/shared/api/supabase";
import { authActions, authState, authGetters } from "@/shared/stores/store";

export const useAuthStore = defineStore<'auth', authState, authGetters, authActions>('auth', {
  state() {
    return {
      currentUser: null,
      redirectRoute: null
    }
  },
  getters: {
    isAuth() {
      return !!this.currentUser
    }
  },
  actions: {
    loadUser() {
      this.currentUser = supabase.auth.getUser()
    },
    clearUser() {
      this.currentUser = null
    },
    saveRedirectRoute(route: Partial<RouteLocation>) {
      const { name, params, query, hash } = route

      localStorage.setItem('redirectRoute', JSON.stringify({ name, params, query, hash }))
    },
    loadRedirectRoute() {
      this.redirectRoute = JSON.parse(
          localStorage.getItem('redirectRoute') || 'null'
      ) as Partial<RouteLocation> | null
    },
    clearRedirectRoute() {
      localStorage.removeItem('redirectRoute')
      this.redirectRoute = null
    },
  }
})