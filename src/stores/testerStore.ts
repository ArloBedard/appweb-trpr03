import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { userService } from '../services/userService'
import type { Tester } from '../scripts/types'

export const useTesterStore = defineStore('testerStoreId', () => {
  const testers = ref<Tester[]>([])
  const onError = ref(false)

  getTesters()

  async function createTester(email: string, password: string, name: string) {
    try {
      onError.value = false
      const role = 'tester'
      const userData = await userService.registerUser(email, password, name, role)

      const tester: Tester = {
        email: email,
        name: name,
        role: role,
        password: password
      }

      testers.value.push(tester)

      return userData
    } catch (error) {
      onError.value = true
      throw error
    }
  }

  async function getTesters() {
    try {
      onError.value = false
      const data = await userService.getUsers()

      const testerUsers = data.filter((user: any) => user.role === 'tester')

      testers.value = testerUsers.map((user: any) => ({
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password
      }))

      return
    } catch (error) {
      onError.value = true
      throw error
    }
  }

  return {
    onError,
    createTester,
    testers
  }
})
