<template>
  <view class="login-container">
    <view class="greeting">
      <view class="txt">👋创建您的帐户!</view>
      <view class="sub-txt">收发包裹需要创建一个账号</view>
    </view>
    <view class="input-container">
      <view class="input-item">
        <text class="input-label">用户名</text>
        <input v-model="params.phone" type="text" placeholder="请输入用户名" />
      </view>
      <view class="input-item">
        <text class="input-label">手机号</text>
        <input
          v-model="params.phone"
          type="number"
          placeholder="请输入手机号"
        />
      </view>
      <view class="input-item">
        <text class="input-label">密码</text>
        <input
          v-model="params.password"
          type="password"
          placeholder="请输入密码"
        />
      </view>
      <view class="input-item">
        <text class="input-label">确认密码</text>
        <input
          v-model="params.password"
          type="password"
          placeholder="请输入密码"
        />
      </view>
    </view>
    <view class="btn-container">
      <button @tap="handleRegister" size="normal" class="login-btn">
        注册
      </button>
      <view class="no-account" @click="toLogin">已有账号！去登陆</view>
    </view>
  </view>
</template>
    
<script setup lang='ts'>
import { ref } from "vue";

const params = ref({
  phone: "",
  password: "",
});
const handleRegister = () => {};
const toLogin = () => {
  uni.redirectTo({
    url: "/pages/login/index",
  });
};
</script>
    
<style lang="less" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //   background-color: #f2f2f2;
  height: 100vh;
  .greeting {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .txt {
      font-size: 20px;
      font-weight: bold;
    }
    .sub-txt {
      font-size: 14px;
      color: #9f9f9f;
      margin-top: 8px;
    }
  }

  .input-container {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);

    .input-item {
      margin-bottom: 20px;
      width: 100%;

      .input-label {
        color: #000;
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 8px;
      }

      input[type="number"],
      input[type="password"],
      input[type="text"] {
        border: 1px solid #eaeaea;
        font-size: 16px;
        padding: 0 10px;
        height: 40px;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }

  .btn-container {
    margin-top: 40px;
    width: calc(100% - 40px);

    .login-btn {
      width: 100%;
      height: 48px;
      border-radius: 12px;
      font-size: 18px;
      color: #fff;
      background: #167351;
      border: none;
    }
    .no-account {
      margin-top: 20px;
      text-align: center;
      font-size: 14px;
      color: #66948a;
    }
  }
}
</style>