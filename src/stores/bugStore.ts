import { defineStore } from 'pinia'
import { ref } from 'vue'
import { bugService } from '../services/bugService'
import type { Bug } from '../scripts/types'
import { useAuthStore } from './authStore'

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
        solved: bug.solved,
        img: bug.img
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
          solved: updatedBug.solved,
          img: updatedBug.img
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
      await bugService.deleteBug(bugId)
      bugs.value = bugs.value.filter((bugs) => bugs.id !== bugId)
    } catch (error) {
      onError.value = true
      throw error
    }
  }

  async function createBug(
    title: string,
    description: string,
    steps: string,
    category: string,
    platform: string,
    priority: number,
    img: string
  ) {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId

      const data = await bugService.createBug(
        userId,
        title,
        description,
        steps,
        category,
        platform,
        priority,
        false,
        img
      )

      const bug: Bug = {
        userId,
        title,
        description,
        steps,
        category,
        platform,
        priority,
        solved: false,
        img,
        id: data.id
      }

      bugs.value.push(bug)
    } catch (error) {
      onError.value = true
      throw error
    }
  }

  async function modifyPriority(bugId: string, priority: number) {
    try {
      onError.value = false
      const bugToSolve: Bug | undefined = bugs.value.find((bug) => bug.id === bugId)
      if (bugToSolve) bugToSolve.priority = priority

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
          solved: updatedBug.solved,
          img: updatedBug.img
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
    closeBug,
    createBug,
    modifyPriority
  }
})
