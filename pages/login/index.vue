<template>
	<view class="login-container">
		<view class="greeting">
			<view class="txt">👋欢迎登录，我的朋友!</view>
			<view class="sub-txt">Welcome back you have been missed</view>
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
			<button @click="handleLogin" size="normal" class="login-btn">登录</button>
			<view class="no-account" @click="toRegister">没有账户？请注册</view>
		</view>
	</view>
</template>

<script setup lang='ts'>
	import {
		ref
	} from "vue";
	const phone = ref("");
	const password = ref("");

	const handleLogin = () => {
		console.log("手机号:", phone.value, "密码:", password.value);
	};

	const toRegister = () => {
		console.log("跳转到注册页面");
		uni.redirectTo({
			url: "/pages/register/index",
		});
	};

	uni.request({
		url: 'http://139.9.198.139:8081/hello?name=lisi',
		method: 'GET', // HTTP 请求方法，可以是 GET、POST 等
		data: {}, // 请求参数，如果是 GET 请求，可以将参数拼接到 URL 中
		header: {}, // 请求头部信息
		success: (res) => {
			console.log(res.data); // 请求成功的回调函数
		},
		fail: (err) => {
			console.error(err); // 请求失败的回调函数
		}
	});
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
					font-size: 16px;
					line-height: 24px;
					margin-bottom: ½rem;
				}

				input[type="number"],
				input[type="password"] {
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