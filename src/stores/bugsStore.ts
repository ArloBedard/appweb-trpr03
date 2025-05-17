import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { bugsService } from '../services/bugsService'
import type { Category, Bug } from '../scripts/types'

export const useBugsStore = defineStore('profileStoreId', () => {
  const categories = ref<Category[]>([])
  const onError = ref(false)
  const bugs = ref<Bug[]>([])

  getCategories()
  getBugs()

  async function getCategories() {
    try {
      onError.value = false
      const data = await bugsService.getCategories()

      categories.value = data.map((category: any) => ({
        name: category.name,
        id: category.id
      }))
    } catch (error) {
      onError.value = true
    }
  }

  async function getBugs() {
    try {
      onError.value = false
      const data = await bugsService.getBugs()

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
    categories,
    getBugs,
    bugs
  }
})
