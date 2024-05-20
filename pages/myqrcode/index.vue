<template>

	<view class="info-section">
		<view class="info-item">
			<text class="label">姓名:</text>
			<text class="value">{{ user.name }}</text>
		</view>
		<view class="info-item">
			<text class="label">手机:</text>
			<text class="value">{{ user.phone }}</text>
		</view>
		<view class="info-item">
			<text class="label">注册时间:</text>
			<text class="value">{{ formatTime(user.createAt) }}</text>
		</view>
		<view class="info-item">
			<text class="label">角色:</text>
			<text class="value">{{ handleRole(user.role) }}</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import {
		onShow
	} from "@dcloudio/uni-app"
	import { formatTime, handleRole } from "../../utils/utils"
	const user = ref({

	})

	onShow(() => {
		user.value = uni.getStorageSync("userInfo")
	})
</script>

<style lang="less" scoped>
	.info-section {
		padding: 0 20px;
		text-align: center;

		.info-item {
			display: flex;
			justify-content: space-between;
			padding: 16px 0;
			border-bottom: 1px solid #eee;

			.label {
				font-weight: bold;
			}
		}


	}
</style>