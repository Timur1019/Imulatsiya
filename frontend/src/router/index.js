import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AdminPage from '../views/AdminPage.vue'
import AppsDisplayPage from '../views/AppsDisplayPage.vue'
import InfoDisplayPage from '../views/InfoDisplayPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/admin', name: 'admin', component: AdminPage },
  { path: '/display/apps', name: 'display-apps', component: AppsDisplayPage },
  { path: '/display/info', name: 'display-info', component: InfoDisplayPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
