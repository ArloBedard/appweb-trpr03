import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'

export const useProfileStore = defineStore('profileStoreId', () => {
  const email = ref('')
  const name = ref('')
  const onError = ref(false)
  const role = ref('')

  function _initializeProfile(profile: { email: string; name: string; role: string }) {
    email.value = profile.email
    name.value = profile.name
    role.value = profile.role
    onError.value = false
  }

  async function getProfile() {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId // Assuming getUserId is a computed or a ref inside authStore
      const profile = await userService.getUserById(userId)
      _initializeProfile(profile)
    } catch (error) {
      onError.value = true
    }
  }

  async function createTester(email: string, password: string, name: string) {
    try {
      onError.value = false
      const role = 'tester'

      const userData = await userService.registerUser(email, password, name, role)
      console.log('User created successfully:', userData)

      const profile = { email, name, role }
      _initializeProfile(profile)

      return userData
    } catch (error) {
      onError.value = true

      throw error
    }
  }

  return {
    email,
    name,
    role,
    onError,
    getProfile,
    createTester
  }
})
