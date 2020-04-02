import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { title: '登录', icon: 'user' }
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard', isRedirect: '1' }
      }
    ]
  },
  {
    path: '/resourceManagement',
    component: Layout,
    redirect: '/resourceManagement/mechanism',
    name: '资源管理',
    meta: { title: '资源管理', icon: 'example', isRedirect: '1' },
    children: [
      {
        path: 'mechanism',
        name: 'mechanism',
        component: () => import('@/views/resourceManagement/mechanism/index'),
        meta: { title: '机构管理', icon: 'table' }
      },
      {
        hidden: true,
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/resourceManagement/mechanism/add'),
        meta: {
          title: '机构详情',
          activeMenu: '@/views/resourceManagement/mechanism/add',
          redirect: '/resourceManagement/mechanism'
        }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
