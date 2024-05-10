<template>
	<scroll-view scroll-y class="order-list">
		<view class="order-item" v-for="(item,index) in list" :key="index">
			<view class="top">
				<view class="order-time">下单时间：2024-02-02 14:50:30</view>
			</view>
			<view class="content">
				<view class="address left">
					<view class="name">{{item.senderName}}</view>
					<view class="city">{{item.senderRegion.split(",")[0]}}</view>
				</view>
				<view class="status">
					<view class="txt">已签收</view>
					<image src="../../static/lian.png" class="lian"></image>
				</view>
				<view class="address right">
					<view class="name">{{item.receiverName}}</view>
					<view class="city">{{item.receiverRegion.split(",")[0]}}</view>
				</view>
			</view>
			<view class="footer">
				<button class="del" @click="deleteOrder(item.id)">删除</button>
			</view>
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { deleteLogist, logisticsList } from '../../api/logistics';

	const list : any = ref([])
	const deleteOrder = async (id) => {
		uni.showModal({
			title: "确认是否删除订单",
			success: async () => {
				let res = await deleteLogist(id)
				if (res) {
					loadList()
				}
			}
		})

	}
	const loadList = async () => {
		let res = await logisticsList({})
		if (res) {
			list.value = res
		}
	}
	onMounted(async () => {
		loadList()
	})
</script>

<style lang="less" scoped>
	.order-list {
		background: #eee;
		height: 100vh;

		.order-item {
			background: #fff;
			border-radius: 5px;
			padding: 8px 4px;
			margin: 0 12px 12px;

			.top {
				font-size: 13px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding: 4px 8px;
			}

			.content {
				display: flex;
				align-items: flex-start;
				justify-content: space-between;

				.status {
					font-size: 16px;
					font-weight: 600;
					position: relative;
					margin-top: 12px;

					.lian {
						position: absolute;
						width: 48px;
						height: 48px;
					}
				}

				.address {
					display: flex;
					flex-direction: column;
					margin: 12px;
					width: 100px;
					justify-content: center;

					&.left {
						align-items: flex-start;
					}

					&.right {
						align-items: flex-end;
					}

					.name {
						font-size: 14px;
					}

					.city {
						margin-top: 14px;
						font-size: 14px;
					}
				}
			}

			.footer {
				display: flex;
				align-items: flex-end;
				justify-content: flex-end;

				.del {
					font-size: 12px;
					background: #fff;
					margin-right: 8px;
				}
			}
		}
	}
</style>