export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  authStore.initializeAuth()

  if (to.path === '/login' && authStore.isAuthenticated) {
    return navigateTo('/account')
  }

  if (to.path !== '/login' && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})