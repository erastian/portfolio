import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/shared/stores/auth";

export function authGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> | void {
  const authStore = useAuthStore();

  if (!to.meta.authRequired || authStore.isAuth) {
    return next()
  } else {
    authStore.saveRedirectRoute(to)
    return next({ name: 'Home' })
  }
}