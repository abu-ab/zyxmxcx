<template>
	<scroll-view class="list">
		<view class="list-item" v-for="(item,index) in list" :key="index">
			<view class="top">
				<view class="initial" v-if="item.isDefault">默认</view>
				<view class="name">{{item.recipientName}}</view>
				<view class="phone">{{item.phoneNumber}}</view>
			</view>
			<view class="content">
				<view class="txt" :style="{'marginLeft':item.isDefault?'36px':'8px'}">
					{{ item.province }}{{ item.city }}{{ item.district }}{{ item.addressLine }}
				</view>
				<image src="../../static/edit.png" class="edit" @click="edit(item.id)"></image>
			</view>
		</view>

		<view class="footer">
			<view class="add" @click="add"> 新增收货地址 </view>
		</view>
	</scroll-view>

</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onShow } from "@dcloudio/uni-app"
	import { addressList } from '../../api/addressApi';
	let list : any = ref([])

	const edit = (id) => {
		uni.navigateTo({
			url: `/pages/editAddress/index?id=${id}`
		})
	}

	const add = () => {
		uni.navigateTo({
			url: "/pages/editAddress/index"
		})
	}

	onShow(async () => {
		const userInfo = uni.getStorageSync("userInfo")
		let res = await addressList(userInfo.id)
		if (res) {
			console.log(res)
			list.value = res
			console.log(list)
		}
	})
</script>

<style lang="less" scoped>
	.list {
		background: #eee;
		height: 100vh;

		.list-item {
			background: #fff;
			border-radius: 5px;
			padding: 16px;
			margin: 12px;

			.top {
				display: flex;
				align-items: center;

				.initial {
					font-size: 12px;
					background: blue;
					padding: 2px;
					border-radius: 2px;
					color: #fff;
				}

				.name {
					font-size: 12px;
					margin-left: 8px;
				}

				.phone {
					font-size: 12px;
					margin-left: 8px;
				}
			}

			.content {
				margin-top: 12px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.txt {
					margin-left: 36px;
					font-size: 12px;
					color: #5e5e5e;
				}

				.edit {
					width: 16px;
					height: 16px
				}
			}
		}

	}

	.footer {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;

		.add {
			width: calc(100vw - 40px);
			height: 40px;
			border-radius: 5px;
			line-height: 40px;
			text-align: center;
			font-size: 14px;
			background-color: #fff;
			color: #000000;
			border: 1px solid #111111;
			font-weight: 600;
		}
	}
</style>