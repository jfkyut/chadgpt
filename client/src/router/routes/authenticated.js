import AuthenticatedLayout from '@/layouts/auth/AuthenticatedLayout.vue';
import guards from '@/router/middleware/guards';

const { authenticated, verified } = guards();

const authenticatedRoutes = [
  {
    path: '/',
    alias: ['/home', '/dashboard'],
    name: 'home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: {
      layout: AuthenticatedLayout,
      title: 'Home'
    },
    beforeEnter: [authenticated, verified]
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/profile/ProfileView.vue'),
    meta: {
      layout: AuthenticatedLayout,
      title: 'Account'
    },
    beforeEnter: [authenticated, verified]
  },
  {
    path: '/chat',
    name: 'new-chat',
    component: () => import('@/views/chat/ChatView.vue'),
    meta: {
      layout: AuthenticatedLayout,
      title: 'Chat'
    },
    beforeEnter: [authenticated, verified]
  },
  {
    path: '/chat/:id',
    name: 'chat',
    component: () => import('@/views/chat/ChatView.vue'),
    meta: {
      layout: AuthenticatedLayout,
      title: 'Chat'
    },
    beforeEnter: [authenticated, verified]
  },
  {
    path: '/travel/create',
    name: 'travel-create',
    component: () => import('@/views/travel/create/TravelCreateView.vue'),
    meta: {
      layout: AuthenticatedLayout,
      title: 'New Travel'
    },
    beforeEnter: [authenticated, verified]
  },
  {
    path: '/travel/:id',
    name: 'travel',
    component: () => import('@/views/travel/travel/TravelView.vue'),
    meta: {
      layout: AuthenticatedLayout,
      title: 'New Travel'
    },
    beforeEnter: [authenticated, verified]
  },
];

export default authenticatedRoutes;