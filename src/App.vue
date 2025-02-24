<script setup lang="ts">
import { RouteLocationRaw, RouterView, useRouter } from 'vue-router';
import { supabase } from '@/shared/api/supabase';
import { useAuthStore } from '@/shared/stores/auth';
import { Analytics } from '@vercel/analytics/vue'


const router = useRouter();
const authStore = useAuthStore();

authStore.loadUser();

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') {
    authStore.loadUser();
    authStore.loadRedirectRoute();
  } else if (event === 'SIGNED_OUT') {
    authStore.clearUser();
  }
})

authStore.$onAction(({name, store, after}) => {
  if (name === 'loadRedirectRoute') {
    after(async () => {
      const redirectRoute = store.redirectRoute

      if (redirectRoute) {
        await router.isReady()
        await router.replace(redirectRoute as RouteLocationRaw)
        authStore.clearRedirectRoute()
      }
    })
  }
})
</script>

<template>
  <Analytics/>
  <RouterView/>
</template>

