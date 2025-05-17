import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoryService } from '../services/categoryService'
import type { Category } from '../scripts/types'

export const useCategoryStore = defineStore('categoryStoreId', () => {
  const categories = ref<Category[]>([])
  const onError = ref(false)

  getCategories()

  async function getCategories() {
    try {
      onError.value = false
      const data = await categoryService.getCategories()

      categories.value = data.map((category: any) => ({
        name: category.name,
        id: category.id
      }))
    } catch (error) {
      onError.value = true
    }
  }

  return {
    categories
  }
})
