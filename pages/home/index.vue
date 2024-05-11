<template>
	<view class="page-body">
		<view class="top">

		</view>
		<view class="freight-content">
			<view class="title">查询运输费用</view>
			<view class="search-item">
				<input v-model="search.start" class="input" placeholder="起点" />
				<input v-model="search.end" class="input" placeholder="终点" />
			</view>
			<button>开始计算</button>
		</view>
		<view class="list">
			<view class="title">我的服务</view>
			<view class="list-item" @click="createOrder">
				<view class="left">
					<image src="../../static/car.png" class="image"></image>
					<view class="text">快递</view>
				</view>
				<image src="../../static/right.png" class="right"></image>
			</view>
			<view class="list-item">
				<view class="left">
					<image src="../../static/goods.png" class="image"></image>
					<view class="text">收货</view>
				</view>
				<image src="../../static/right.png" class="right"></image>
			</view>
		</view>
	</view>
	<tabbar :currentPage="0"></tabbar>
</template>

<script setup lang="ts">
	import { reactive } from "vue";
	import tabbar from "@/components/tabbar.vue"
	const search = reactive({
		start: "",
		end: ""
	})

	const createOrder = () => {
		const userInfo = uni.getStorageSync("userInfo")
		if (userInfo && userInfo.id) {
			uni.navigateTo({
				url: "/pages/createOrder/index"
			})
		} else {
			uni.navigateTo({
				url: "/pages/login/index"
			})
		}

	}
</script>

<style lang="less" scoped>
	.freight-content {
		margin: 0 auto;
		width: calc(100% - 20px);
		background: #eee;
		padding: 12px 20px;
		box-sizing: border-box;
		border-radius: 12px;

		.title {
			font-size: 16px;
			font-weight: bold;
		}

		.search-item {
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin: 12px 0;
			gap: 24px;

			.input {
				border: 1px solid #ccc;
				border-radius: 5px;
				flex: 1;
				width: 100%;
				height: 28px;
				padding: 4px 8px;
			}
		}
	}

	.list {
		width: calc(100% - 20px);
		margin: 12px auto;

		.title {}

		.list-item {
			width: 100%;
			background: #F4F4F4;
			padding: 12px 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			margin-top: 12px;
			border-radius: 12px;

			.left {
				display: flex;
				align-items: center;

				.image {
					width: 48px;
					height: 48px;
					margin-right: 12px;
				}
			}

			.right {
				width: 24px;
				height: 24px;
			}
		}
	}
</style>