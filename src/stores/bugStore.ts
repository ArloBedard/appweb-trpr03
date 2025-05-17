import { defineStore } from 'pinia'
import { ref } from 'vue'
import { bugService } from '../services/bugService'
import type { Bug } from '../scripts/types'

export const useBugStore = defineStore('bugStoreId', () => {
  const onError = ref(false)
  const bugs = ref<Bug[]>([])

  getBugs()

  async function getBugs() {
    try {
      onError.value = false
      const data = await bugService.getBugs()

      bugs.value = data.map((bug: any) => ({
        id: bug.id,
        userId: bug.userId,
        title: bug.title,
        description: bug.description,
        steps: bug.steps,
        category: bug.categoryId,
        platform: bug.platform,
        priority: bug.priority,
        solved: bug.solved
      }))
    } catch (error) {
      onError.value = true
    }
  }

  return {
    getBugs,
    bugs
  }
})
