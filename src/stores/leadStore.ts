import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { userService } from '../services/userService'
import type { User } from '../scripts/types'

export const useLeadStore = defineStore('leadStoreId', () => {
  const leads = ref<User[]>([])
  const onError = ref(false)

  getLeads()

  async function getLeads() {
    try {
      onError.value = false
      const data = await userService.getUsers()

      const leadsUser = data.filter((user: any) => user.role === 'lead')

      leads.value = leadsUser.map((user: any) => ({
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

  async function modifyKarma(leadEmail: string, karma: number) {
    try {
      const lead = leads.value.find((lead) => lead.email === leadEmail)
      if (lead) {
        const newKarma = lead.karma + karma
        await userService.modifyUser(
          lead.id,
          lead.email,
          lead.name,
          lead.role,
          lead.password,
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
    leads,
    getLeads,
    modifyKarma
  }
})
