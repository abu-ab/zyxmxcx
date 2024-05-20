<template>
	<scroll-view class="list">
		<view v-if="list.length==0" class="no-content">
			<image src="../../static/no-order.png" class="no-image"></image>
			<view class="txt">暂无地址</view>
		</view>
		<view class="list-item" v-for="(item,index) in list" :key="index">
			<view class="top">
				<!-- <view class="initial" v-if="item.isDefault">默认</view> -->
				<view class="name">{{item.recipientName}}</view>
				<view class="phone">{{item.phoneNumber}}</view>
			</view>
			<view class="content">
				<view class="txt">
					{{ item.province }}{{ item.city }}{{ item.district }}{{ item.addressLine }}
				</view>
				<view class="right">
					<image src="../../static/edit.png" class="edit" @click="edit(item.id)"></image>
					<image src="../../static/del.png" class="del" @click="del(item.id)"></image>
				</view>
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
	import { addressList, deleteAddress } from '../../api/addressApi';
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

	const del = async (id) => {
		uni.showModal({
			title: "确认是否删除地址",
			success: async (e) => {
				if (e.confirm) {
					let res = await deleteAddress(id)
					if (res) {
						loadList()
					}
				}
			}
		})

	}

	const loadList = async () => {
		const userInfo = uni.getStorageSync("userInfo")
		let res = await addressList({ userId: userInfo.id })
		if (res) {
			console.log(res)
			list.value = res
			console.log(list)
		}
	}

	onShow(async () => {
		loadList()
	})
</script>

<style lang="less" scoped>
	.list {
		background: #eee;
		height: 100vh;

		.no-content {
			height: 60%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.no-image {
				width: 128px;
				height: 128px;
			}

			.txt {
				margin-top: 8px;
				font-size: 20px;
				font-weight: 600;
			}
		}

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
					margin-left: 8px;
					font-size: 12px;
					color: #5e5e5e;
				}

				.right {
					display: flex;
					align-items: center;

					.edit {
						width: 16px;
						height: 16px
					}

					.del {
						width: 24px;
						height: 24px;
						margin-left: 12px;
					}
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