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

  async function createCategory(name: string) {
    try {
      onError.value = false
      if (categories.value.find((category) => category.name === name)) {
        confirm('Cette catégorie existe déjà.')
        return
      }
      const data = await categoryService.createCategory(name)

      const category: Category = {
        id: data.user?.id,
        name: name
      }

      categories.value.push(category)
    } catch (error) {
      onError.value = true
    }
  }

  return {
    categories,
    onError,
    createCategory
  }
})
