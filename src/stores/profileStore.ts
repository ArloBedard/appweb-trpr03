import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'

export const useProfileStore = defineStore('profileStoreId', () => {
  const email = ref('')
  const name = ref('')
  const password = ref('')
  const onError = ref(false)
  const role = ref('')
  const karma = ref(0)

  function _initializeProfile(profile: {
    email: string
    name: string
    role: string
    password: string
    karma: number
  }) {
    email.value = profile.email
    name.value = profile.name
    password.value = profile.password
    role.value = profile.role
    karma.value = profile.karma
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

  async function modifyProfile(name: string, password: string) {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId
      const profile = await userService.modifyUser(
        userId,
        email.value,
        name,
        role.value,
        password,
        karma.value
      )
      _initializeProfile(profile)
    } catch (error) {
      onError.value = true
    }
  }

  return {
    email,
    name,
    role,
    onError,
    getProfile,
    password,
    modifyProfile,
    karma
  }
})
