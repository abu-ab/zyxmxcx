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
			<button @click="compute">开始计算</button>
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
			<view class="list-item" @click="orderList">
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
	import { ref } from "vue";
	import tabbar from "@/components/tabbar.vue"
	import { getAddress } from "../../api/txApi";
	const search = ref({
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

	const orderList = () => {
		const userInfo = uni.getStorageSync("userInfo")
		if (userInfo && userInfo.id) {
			uni.navigateTo({
				url: "/pages/orderList/index"
			})
		} else {
			uni.navigateTo({
				url: "/pages/login/index"
			})
		}

	}
	const compute = async () => {
		if (!search.value.start) {
			uni.showToast({
				icon: "none",
				title: "开始地址不能为空"
			})
			return
		}
		if (!search.value.end) {
			uni.showToast({
				icon: "none",
				title: "结束地址不能为空"
			})
			return
		}
		let start : any = await getAddress(search.value.start)
		let end : any = await getAddress(search.value.end)
		const startLocation = start.result.location
		const endLocation = end.result.location
		const distance = haversineDistance(startLocation.lat, startLocation.lng, endLocation.lat, endLocation.lng)
		console.log(start)
		console.log(end)
		console.log(distance)
		uni.showModal({
			content: `${search.value.start}和${search.value.end}的距离为：${distance.toFixed(2)}公里
			运费为：${(distance * 0.3).toFixed(2)}元`
		})
	}
	function haversineDistance(lat1, lon1, lat2, lon2) {
		// 将角度转换为弧度
		function toRad(degrees) {
			return degrees * Math.PI / 180;
		}

		var R = 6371; // 地球半径（单位：公里）
		var dLat = toRad(lat2 - lat1);
		var dLon = toRad(lon2 - lon1);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var distance = R * c;

		return distance;
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