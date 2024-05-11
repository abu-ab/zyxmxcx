<template>
	<view>
		<view class="user-info">
			<template v-if="userInfo&&userInfo.id">
				<view class="info-left">
					<image src="../../static/avatar.png" class="avatar"></image>
					<view class="right">
						<view class="name">{{userInfo.name}}</view>
						<view class="phone">{{userInfo.phone}}</view>
					</view>

				</view>
				<image src="../../static/qrcode.png" class="qrcode" @click="navigate('/pages/myqrcode/index')"></image>
			</template>
			<view v-else class="no-login" @click="navigate('/pages/login/index')">
				<view class="to-login">
					<image src="../../static/enptyAvatar.png" class="enptyAvatar"></image>
					登录/注册
				</view>
				<image src="../../static/right.png" class="right"></image>
			</view>
		</view>
		<view class="user-content">
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
				<view class="item" @click="logout">
					<view class="item-left">
						<image class="icon" src="../../static/back.png"></image>
						<view class="txt">退出登录</view>
					</view>
					<image src="../../static/right.png" class="right"></image>
				</view>
			</view>
		</view>
		<tabbar :currentPage="1"></tabbar>
	</view>
</template>

<script setup lang='ts'>
	import {
		ref
	} from "vue";
	import {
		onShow
	} from "@dcloudio/uni-app"
	import tabbar from "@/components/tabbar.vue";
	const userInfo = ref(uni.getStorageSync("userInfo"))


	onShow(() => {
		userInfo.value = uni.getStorageSync("userInfo")
	})

	const navigate = (url: string) => {
		uni.navigateTo({
			url: url
		})
	}

	const logout = () => {
		uni.setStorageSync("userInfo", {})
		userInfo.value = {}
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

			.right {
				margin-left: 12px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;


				.phone,
				.name {
					font-size: 16px;
					font-weight: 600;
				}

				.phone {
					margin-top: 8px;
				}
			}

		}

		.qrcode {
			width: 36px;
			height: 36px;
		}

		.no-login {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.to-login {
				display: flex;
				align-items: center;
				font-size: 18px;
				font-weight: 500;

				.enptyAvatar {
					width: 32px;
					height: 32px;
					margin-right: 12px;
				}
			}

			.right {
				width: 24px;
				height: 24px;
			}
		}
	}

	.user-content {
		width: calc(100% - 10px);
		background: #fff;
		border-radius: 10px;
		margin: -20px auto 0;
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

		.ad {
			width: 100%;
			height: 97px;
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
	}
</style>