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
      solvedBy: bug.solvedBy,
      img: bug.img,
      id: bug.id
    })

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteBug(bugId: any) {
  try {
    const { data } = await axiosAuth.delete(`${API_URL}/bugs/${bugId}`)

    return data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function createBug(
  userId: string,
  title: string,
  description: string,
  steps: string,
  category: string,
  platform: string,
  priority: number,
  solved: boolean,
  img: string
) {
  try {
    const response = await axiosAuth.post(`${API_URL}/bugs`, {
      userId: userId,
      title: title,
      description: description,
      steps: steps,
      categoryId: category,
      platform: platform,
      priority: priority,
      solved: solved,
      img: img
    })

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const bugService = {
  getBugs,
  updateBug,
  deleteBug,
  createBug
}
