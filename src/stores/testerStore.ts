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
        id: userData.user?.id,
        email: email,
        name: name,
        role: role,
        password: password,
        karma: 0
      }

      testers.value.push(tester)

      return userData
    } catch (error) {
      onError.value = true
      throw error
    }
  }

  async function deleteTester(id: string) {
    try {
      onError.value = false
      const data = await userService.deleteUser(id)
      testers.value = testers.value.filter((tester) => tester.id !== id)
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
        password: user.password,
        id: user.id,
        karma: user.karma
      }))
    } catch (error) {
      onError.value = true
      throw error
    }
  }

  async function modifyKarma(testerEmail: string, karma: number) {
    try {
      const tester = testers.value.find((tester) => tester.email === testerEmail)
      if (tester) {
        const newKarma = tester.karma + karma
        await userService.modifyUser(
          tester.id,
          tester.email,
          tester.name,
          tester.role,
          tester.password,
          newKarma
        )
      }
      onError.value = false
    } catch (error) {
      onError.value = true
      throw error
    }
  }

  return {
    onError,
    createTester,
    testers,
    deleteTester,
    modifyKarma
  }
})
