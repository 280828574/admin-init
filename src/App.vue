<template>
  <div id="app">
    <router-view :key="$route.fullpath" />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.isMobile()
  },
  methods: {
    isMobile: function() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      localStorage.setItem('ismobile', flag ? 1 : 0)
      return flag
    }
  }
}
</script>
