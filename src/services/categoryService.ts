import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

const API_URL = 'http://127.0.0.1:3000'

async function getCategories() {
  try {
    const response = await axiosAuth.get(`${API_URL}/categories`)

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const categoryService = {
  getCategories
}
