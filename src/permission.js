import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [
  '/login',
  '/404',
]

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = window.sessionStorage.getItem('userId');
  if (to.path === '/login' || whiteList.includes(to.path)) {
    next()
    NProgress.done()
    return
  }
  if (hasToken) {
    next()
  } else {
    next(`/login?t=system&redirect=${to.path}`)
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
