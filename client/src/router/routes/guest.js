import GuestLayoutVue from '@/layouts/guest/GuestLayout.vue';
import guards from '../middleware/guards';

const { guest, authenticated, notVerified } = guards();

const guestRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: GuestLayoutVue,
      title: 'Login'
    },
    beforeEnter: [guest]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: {
      layout: GuestLayoutVue,
      title: 'Register'
    },
    beforeEnter: [guest]
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordView.vue'),
    meta: {
      layout: GuestLayoutVue,
      title: 'Forgot password'
    },
    beforeEnter: [guest]
  },
  {
    path: '/verify-email',
    name: 'verify-email',
    component: () => import('@/views/auth/EmailVerificationView.vue'),
    meta: {
      layout: GuestLayoutVue,
      title: 'Verify email'
    },
    beforeEnter: [authenticated, notVerified]
  },
  {
    path: '/password-reset/:token',
    name: 'password-reset',
    component: () => import('@/views/auth/PasswordReset.vue'),
    meta: {
      layout: GuestLayoutVue,
      title: 'Password reset'
    },
    beforeEnter: [guest]
  },
];

export default guestRoutes;