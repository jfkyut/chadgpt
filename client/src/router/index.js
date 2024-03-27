import { createRouter, createWebHistory } from 'vue-router'
import guest from './routes/guest'
import authenticated from './routes/authenticated'
import errorRoutes from './routes/error'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    ...guest,
    ...authenticated,
    ...errorRoutes
  ]
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title

  if (title) {
    document.title = `${title} | VTASVP`;
  }

  next()
})

export default router
