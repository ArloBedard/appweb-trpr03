import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:3000'

async function getUserById(userId: any) {
  try {
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.get(`${API_URL}/users/${userId}`)

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function registerUser(email: string, password: string, name: string, role: string) {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      email,
      password,
      name,
      role,
      karma: 0
    })
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function getUsers() {
  try {
    const { data } = await axiosAuth.get(`${API_URL}/users`)

    return data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteUser(userId: any) {
  try {
    const { data } = await axiosAuth.delete(`${API_URL}/users/${userId}`)

    return data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function modifyUser(
  userId: any,
  email: string,
  name: string,
  role: string,
  password: string,
  karma: number
) {
  try {
    const { data } = await axiosAuth.put(`${API_URL}/users/${userId}`, {
      email,
      password,
      name,
      role,
      karma
    })

    return data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const userService = {
  getUserById,
  registerUser,
  getUsers,
  deleteUser,
  modifyUser
}
