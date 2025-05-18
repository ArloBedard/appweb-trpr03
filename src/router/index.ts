import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import routes from './routes'
import { useProfileStore } from '@/stores/profileStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  authStore.loadPersistedToken()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return {
      name: 'Login'
    }
  } else if (to.name === 'Login' && authStore.isLoggedIn) {
    return {
      name: 'Home'
    }
  } else {
    return true
  }
})

router.beforeEach(async (to, from, next) => {
  const profileStore = useProfileStore()

  if (!profileStore.role) {
    await profileStore.getProfile()
  }

  const role = profileStore.role

  if (to.name === 'LeadBugs' && role !== 'lead') {
    return next({ name: 'TesterBugs' })
  }

  if (to.name === 'TesterBugs' && role !== 'tester') {
    return next({ name: 'LeadBugs' })
  }

  next()
})

export default router
