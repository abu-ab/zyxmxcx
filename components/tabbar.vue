<template>
	<view class="tabbar">
		<view class="tabbar-item" v-for="(item, index) in data.tabbarList" :key="index" @click="changeTabbar(item)">
			<img class="icon" :src="
          index == props.currentPage ? item.selectedIconPath : item.iconPath
        " />
			<view class="title" :style="index == props.currentPage ? { color: '#6cc2c1' } : ''">{{ item.text }}</view>
		</view>
		<img src="../static/sao.png" class="scan" @click="toScan" />
	</view>
</template>

<script lang="ts" setup>
	import { reactive, defineProps, onMounted, ref } from "vue";
	import { checkRole } from "../utils/utils"
	import {
		onShow
	} from "@dcloudio/uni-app"
	const flag = ref(true)


	onShow(() => {
		flag.value = false
		setTimeout(() => {
			flag.value = true
		}, 200)
	})

	const props = defineProps({
		currentPage: Number,
	});
	const data = reactive({
		tabbarList: [
			{
				pagePath: "/pages/home/index",
				text: "主页",
				iconPath: "../static/home.png",
				selectedIconPath: "../static/selectHome.png",
			},

			{
				pagePath: "/pages/user/index",
				text: "我的",
				iconPath: "../static/my.png",
				selectedIconPath: "../static/selectMy.png",
			},
		],
	});

	const toScan = function () {
		uni.scanCode({
			onlyFromCamera: true,
			success: (res) => {
				console.log("扫描二维码成功,结果:" + res.result);

				if (checkRole(['courier', 'admin'])) {
					uni.navigateTo({
						url: "/pages/map/index?id=" + res.result
					})
				} else {
					uni.navigateTo({
						url: `/pages/orderDetail/index?id=${res.result}`
					})
				}


			},
			error: (res) => {
				console.log("扫描二维码出现错误");
			},
		});
	};

	const changeTabbar = function (item : any) {
		uni.switchTab({
			url: item.pagePath,
		});
	};

	onMounted(() => {
		uni.hideTabBar();
	});
</script>

<style lang="less" scoped>
	.tabbar {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		width: 100%;
		box-sizing: border-box;
		padding: 15rpx 0rpx 55rpx 0rpx;
		background-color: #f8f8f8;
		border-top: #cfcfcf 1px solid;

		.tabbar-item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			.icon {
				width: 28px;
				height: 28px;
			}

			.title {
				font-size: 12px;
				color: #000;
			}
		}

		.scan {
			position: absolute;
			top: 10%;
			left: 50%;
			width: 36px;
			height: 36px;
			transform: translate(-50%, -50%);
		}
	}
</style>