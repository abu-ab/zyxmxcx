<template>
  <view class="login-container">
    <view class="logo">
      <image src="@/static/login.png" />
    </view>
    <view class="input-container">
      <view class="input-item">
        <text class="input-label">手机号</text>
        <input v-model="phone" type="number" placeholder="请输入手机号" />
      </view>
      <view class="input-item">
        <text class="input-label">密码</text>
        <input v-model="password" type="password" placeholder="请输入密码" />
      </view>
    </view>
    <view class="btn-container">
      <button @tap="handleLogin" size="normal" class="login-btn">登录</button>
    </view>
  </view>
</template>
      
  <script setup lang='ts'>
import { ref } from "vue";
const phone = ref("");
const password = ref("");

const handleLogin = () => {
  // 这里添加你的登录逻辑，如调用API、验证用户信息等
  console.log("手机号:", phone.value, "密码:", password.value);
};
</script>
      
  <style lang="less" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  height: 100vh;
  .logo {
    width: 100%;
    height: 329px;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .btn-container {
    margin-top: 40px;

    .login-btn {
      width: 100%;
      height: 48px;
      border-radius: 12px;
      font-size: 18px;
      color: #fff;
      background-color: #007aff;
      border: none;

      &:active {
        background-color: #007aff;
      }
    }
  }
}
</style>