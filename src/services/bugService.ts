import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

const API_URL = 'http://127.0.0.1:3000'

async function getBugs() {
  try {
    const response = await axiosAuth.get(`${API_URL}/bugs`)

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function updateBug(id: any, bug: any) {
  try {
    const response = await axiosAuth.put(`${API_URL}/bugs/${id}`, {
      userId: bug.userId,
      title: bug.title,
      description: bug.description,
      steps: bug.steps,
      categoryId: bug.category,
      platform: bug.platform,
      priority: bug.priority,
      solved: bug.solved,
      id: bug.id
    })

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteBug(){
  
}

export const bugService = {
  getBugs,
  updateBug,
  deleteBug
}
