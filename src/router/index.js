import { createRouter, createWebHistory } from 'vue-router'
import { useLoader }  from '../composables/useLoader.js'
import { getSession } from '../services/auth.js'

import LoginView    from '../views/LoginView.vue'
import HomeView     from '../views/HomeView.vue'
import CreateView   from '../views/CreateView.vue'
import EditView     from '../views/EditView.vue'
import AboutView    from '../views/AboutView.vue'
import ArchiveView  from '../views/ArchiveView.vue'
import StatsView    from '../views/StatsView.vue'
import SettingsView from '../views/SettingsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  // Публичный маршрут — доступен без авторизации
  { path: '/login', component: LoginView, meta: { public: true } },

  { path: '/',           component: HomeView     },
  { path: '/create',     component: CreateView   },
  { path: '/edit/:id',   component: EditView     },
  { path: '/about',      component: AboutView    },
  { path: '/archive',    component: ArchiveView  },   // бонус
  { path: '/stats',      component: StatsView    },   // бонус
  { path: '/settings',   component: SettingsView },   // бонус
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Прокрутка вверх при переходе
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

const { showLoader, hideLoader } = useLoader()

// Guard: показать лоадер + проверить авторизацию
router.beforeEach((to) => {
  showLoader()

  // Если маршрут не публичный и нет сессии - редирект на /login
  const isLoggedIn = !!getSession()
  if (!to.meta.public && !isLoggedIn) {
    return '/login'
  }

  // Если уже залогинен и пытается зайти на /login - на главную
  if (to.path === '/login' && isLoggedIn) {
    return '/'
  }
})

// Скрыть лоадер после перехода (небольшая задержка для плавности)
router.afterEach(() => {
  setTimeout(() => hideLoader(), 400)
})

export default router
