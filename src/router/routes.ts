import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import TestersView from '../views/TestersView.vue'
import LeadBugsView from '../views/LeadBugsView.vue'
import TesterBugsView from '../views/TesterBugsView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/testers',
    name: 'Testers',
    component: TestersView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bugs/lead',
    name: 'LeadBugs',
    component: LeadBugsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bugs/tester',
    name: 'TesterBugs',
    component: TesterBugsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

export default routes
