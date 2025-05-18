import axios from 'axios'
import { parseAxiosError } from '../shared/parseAxiosError'

const API_URL = 'http://127.0.0.1:3000'

async function getToken(credential: { email: string; password: string }) {
  try {
    console.log('Trying to log in with:', credential)
    const response = await axios.post(`${API_URL}/login`, {
      email: credential.email,
      password: credential.password
    })
    const token = response.data.accessToken
    return token
  } catch (error) {
    // Voir la fonction parseAxiosError dans le fichier src/shared/parseAxiosError.js.
    throw parseAxiosError(error)
  }
}

export const authService = {
  getToken
}
