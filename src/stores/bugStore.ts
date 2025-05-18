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

  async function solveBug(bugId: string) {
    try {
      onError.value = false
      const bugToSolve: Bug | undefined = bugs.value.find((bug) => bug.id === bugId)
      if (bugToSolve) bugToSolve.solved = true

      const updatedBug = await bugService.updateBug(bugId, bugToSolve)

      const index = bugs.value.findIndex((bug) => bug.id === updatedBug.id)
      if (index !== -1) {
        bugs.value[index] = {
          id: updatedBug.id,
          userId: updatedBug.userId,
          title: updatedBug.title,
          description: updatedBug.description,
          steps: updatedBug.steps,
          category: updatedBug.categoryId,
          platform: updatedBug.platform,
          priority: updatedBug.priority,
          solved: updatedBug.solved
        }
      }
    } catch (error) {
      onError.value = true
      throw error
    }
  }

  async function closeBug(bugId: string) {
    try {
      onError.value = false
      const bugToSolve = bugs.value.find((bug) => bug.id === bugId)

      const updatedBug = await bugService.deleteBug(bugId)

      const index = bugs.value.findIndex((bug) => bug.id === updatedBug.id)
      if (index !== -1) {
        bugs.value[index] = {
          id: updatedBug.id,
          userId: updatedBug.userId,
          title: updatedBug.title,
          description: updatedBug.description,
          steps: updatedBug.steps,
          category: updatedBug.categoryId,
          platform: updatedBug.platform,
          priority: updatedBug.priority,
          solved: updatedBug.solved
        }
      }
    } catch (error) {
      onError.value = true
      throw error
    }
  }

  return {
    getBugs,
    bugs,
    solveBug,
    onError,
    closeBug
  }
})
