<template>
	<view>
		<view class="user-info">
			<view class="info-left">
				<image src="../../static/avatar.png" class="avatar"></image>
				<view class="phone">18913279983</view>
			</view>
			<image src="../../static/qrcode.png" class="qrcode" @click="navigate('/pages/myqrcode/index')"></image>
		</view>
		<view class="ad">
			<image src="../../static/ad.png" class="ad-image" mode="widthFix"></image>
		</view>
		<view class="list-item">
			<view class="item" @click="navigate('/pages/orderList/index')">
				<view class="item-left">
					<image class="icon" src="../../static/shouye.png"></image>
					<view class="txt">我的订单</view>
				</view>
				<image src="../../static/right.png" class="right"></image>
			</view>
			<view class="item" @click="navigate('/pages/addressList/index')">
				<view class="item-left">
					<image class="icon" src="../../static/shouye_1.png"></image>
					<view class="txt">我的地址</view>
				</view>
				<image src="../../static/right.png" class="right"></image>
			</view>
			<view class="item">
				<view class="item-left">
					<image class="icon" src="../../static/huowu-kaixin.png"></image>
					<view class="txt">货物包裹</view>
				</view>
				<image src="../../static/right.png" class="right"></image>
			</view>
			<view class="item">
				<view class="item-left">
					<image class="icon" src="../../static/shoucang.png"></image>
					<view class="txt">收藏包裹</view>
				</view>
				<image src="../../static/right.png" class="right"></image>
			</view>
		</view>
		<tabbar :currentPage="1"></tabbar>
	</view>
</template>

<script setup lang='ts'>
	import tabbar from "@/components/tabbar.vue";
	const navigate = (url: string) => {
		uni.navigateTo({
			url: url
		})
	}
</script>

<style scoped lang="less">
	.user-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 125px;
		background: linear-gradient(to right, #D2FCFC, #e0d7e2);
		padding: 0 20px;

		.info-left {
			display: flex;
			align-items: center;

			.avatar {
				width: 40px;
				height: 40px;
			}

			.phone {
				font-size: 16px;
				font-weight: 600;
				margin-left: 8px;
			}
		}

		.qrcode {
			width: 36px;
			height: 36px;
		}
	}


	.ad {
		width: 100%;
		height: 97px;
		margin-top: 12px;
		padding: 0 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;

		.ad-image {
			width: 100%;
			height: 100%;
		}
	}

	.list-item {
		display: flex;
		flex-direction: column;
		padding: 0 20px;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12px 0;
			border-bottom: 1px solid #eee;

			.item-left {
				display: flex;
				align-items: center;

				.icon {
					width: 24px;
					height: 24px;
				}

				.txt {
					font-size: 14px;
					line-height: 22px;
					font-weight: 500;
					margin-left: 8px;
				}
			}

			.right {
				width: 24px;
				height: 24px;
			}
		}
	}
</style>