import AuthenticatedLayout from '@/layouts/auth/AuthenticatedLayout.vue';
import guards from '@/router/middleware/guards';

const { authenticated, verified } = guards();

const authenticatedRoutes = [
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
  }
];

export default authenticatedRoutes;