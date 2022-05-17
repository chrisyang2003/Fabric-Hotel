import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '面板主页', icon: 'dashboard', affix: true },
      }
    ]
  },

  {
    path: '/hotelinfo',
    component: Layout,
    redirect: '/hotelinfo',
    children: [
      {
        path: 'hotelinfo',
        component: () => import('@/views/hotel/index'),
        name: 'hotelinfo',
        meta: { title: '酒店信息', icon: 'dashboard', affix: true },
      }
      
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },

  {
    path: '/manage',
    component: Layout,
    redirect: '/manage',
    name: 'manage',
    meta: {
      title: '酒店管理',
      icon: 'table'
    },
    children: [
      {
        path: '/rooms',
        component: () => import('@/views/rooms/index'),
        name: 'room',
        meta: { title: 'Room | 房间管理', icon: 'tab' }
      },
      {
        path: '/order',
        component: () => import('@/views/order/index'),
        name: 'order',
        meta: { title: 'Trx | 交易列表', icon: 'tab' }
      },
    
      {
        path: '/token',
        component: () => import('@/views/token/index'),
        name: 'token',
        meta: { title: 'Token | 代币管理', icon: 'tab' }
      },
    
      {
        path: '/user',
        component: () => import('@/views/user/index'),
        name: 'user',
        meta: { title: 'User | 用户管理', icon: 'tab' }
      },
    
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/comment/index'),
        meta: { title: 'Comment | 评论管理', icon: 'tab' }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }

]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
