<template>
  <div class="error-wrap">
    <img class="img" src="@/assets/404.png">
    <span class="btn">重新加载</span>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  mounted() {
    let btn = document.querySelector('.btn')
    btn.addEventListener('click', function() {
      window.location.reload()
    }, false)
  },
}
</script>

<style lang="scss" scoped>
.error-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 375px;
      text-align: center;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      .img {
      width: 100%;
    }

    .btn {
      display: inline-block;
      width: 118px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 19px;
      color: rgba(255, 70, 100, 1);
      border: 1px solid rgba(255, 70, 100, 1);
      border-radius: 20px;
      cursor: pointer;
    }
    }

</style>
