export interface Tester {
  id: string
  email: string
  password: string
  name: string
  role: string
}

export interface Category {
  id: string
  name: string
}

export interface Bug {
  id: number
  userId: number
  title: string
  description: string
  steps: string
  category: string
  platform: string
  priority: number //ex.: 1 (critique), 2 (prioritaire), 3 (important)
  solved: boolean
}
