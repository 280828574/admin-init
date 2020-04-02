<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">管理员请登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          @keyup.enter.native="keyDownEnt('username')"
          @input="changeInput"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="keyDownEnt('password')"
          @input="changeInput"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="verify">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { getRoles, login } from '@/api/user'
import md5 from 'js-md5'
let me
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '', // 用户名
        password: '', // 密码
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false, // 是否开始loading
      passwordType: 'password', // 密码状态
      redirect: undefined, // 从哪个页面来的
      roleName: '',
      roleId: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    me = this
  },
  methods: {
    // 显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    changeInput() {
      me.ridList = []
      me.ridList2 = []
      me.loginForm.rid = ''
      me.loginForm.org = ''
      this.$forceUpdate()
    },
    // 点击回车
    keyDownEnt(key) {
      if (key === 'username' && me.loginForm.username !== '') {
        me.$refs.password.focus()
        return
      }
      if (key === 'password' && me.loginForm.username !== '' && me.loginForm.password !== '') {
        me.verify()
      }
    },
    // 验证
    verify() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          me.getUserInfo()
        }
      })
    },
    // 获取用户信息
    getUserInfo() {
      this.$router.push({ path: this.redirect || '/' })
      const obj = {
        forAccessToken: true,
        loginName: me.loginForm.username,
        pwd: md5(me.loginForm.password)
      }
      this.loading = true
      this.$router.push({ path: this.redirect || '/' })
      window.sessionStorage.setItem('userId', 'tongliya')
      this.loading = false
      // login(obj).then(response => {
      //   this.$router.push({ path: this.redirect || '/' })
      //   window.sessionStorage.setItem('userId', 'tongliya')
      // }).catch(() => {
      //   this.loading = false
      // })
    },
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .rid-wrap{
    width: calc(100% - 35px);
    .el-input{
      width: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
