<template>
	<view class="container">
		<view class="order-info map">
			<myMap :noFull="true"></myMap>
		</view>
		<view class="order-info">
			<view class="info-item">
				<text class="info-label">订单编号:</text>
				<text class="order-no">{{ order.id }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">订单状态:</text>
				<text
					:class="{ 'status-paid': order.status === '100', 'status-shipped': order.status === '200' }">{{ getStatusText(order.status) }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">下单时间:</text>
				<text>{{ formatTime(order.createAt) }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">发件人姓名:</text>
				<text>{{ order.senderName }}</text>

			</view>
			<view class="info-item">
				<text class="info-label">发件人手机号:</text>
				<text>{{ order.senderPhone }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">发件人地址:</text>
				<view>
					<text>{{ order.senderRegion.split(",").join(" ") }} </text>
					<text> {{ order.senderAddress }}</text>
				</view>
			</view>
			<view class="info-item">
				<text class="info-label">收件人姓名:</text>
				<text>{{ order.receiverName }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">收件人手机号:</text>
				<text>{{ order.receiverPhone }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">收件人地址:</text>
				<view>
					<text>{{ order.receiverRegion.split(",").join(" ") }}</text>
					<text>{{ order.receiverAddress }}</text>
				</view>
			</view>
			<view class="info-item">
				<text class="info-label">快递公司:</text>
				<text>{{ order.expressCompany }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">运单号:</text>
				<text>{{ order.waybillNumber }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">发货时间:</text>
				<text>{{ order.shippingTime?formatTime(order.shippingTime):"暂未发货" }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">收货时间:</text>
				<text>{{order.deliveryTime? formatTime(order.deliveryTime) :"暂未收货"}}</text>
			</view>
		</view>
		<view class="btn" @click="confirm" v-if="order.status=='200'">确认订单</view>
		<view class="image-info">
			<image :src="qrcode" v-if="qrcode" class="qrcode"></image>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad } from "@dcloudio/uni-app"
	import myMap from "../map/index.vue"
	import { confirmOrderStatus, logistDetail } from '../../api/logistics';
	import { getQRCode } from '../../api/qrcode';
	import { formatTime, getStatusText } from "../../utils/utils"
	let order : any = ref({
		createAt: null,
		deliveryTime: null,
		expressCompany: "",
		id: "",
		receiverAddress: "",
		receiverName: "",
		receiverPhone: "",
		receiverRegion: "",
		senderAddress: "",
		senderName: "",
		senderPhone: "",
		senderRegion: "",
		shippingTime: null,
		status: "",
		userId: "",
		waybillNumber: ""
	})

	const qrcode = ref("")


	onLoad((e) => {
		console.log(e)
		const id = e.id;
		loadDetail(id)
	})


	const confirm = () => {
		uni.showModal({
			title: "是否确认订单",
			success: async (e) => {
				if (e.confirm) {
					let res = await confirmOrderStatus(order.value.id)
					if (res) {
						loadDetail(order.value.id)
					}
				}
			}
		})
	}

	const loadDetail = async (id) => {
		let res = await logistDetail(id)
		console.log(res)
		order.value = res;
		let code = await getQRCode(id)
		console.log("code", code)
		if (typeof code === "boolean") {
			qrcode.value = `http://139.9.198.139:8081/images/${id}.png`
		}
	}
</script>

<style lang="less" scoped>
	.container {
		padding: 20px;
	}

	.order-info {
		background-color: #f9f9f9;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.map {
		height: 200px;
	}

	.title {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 20px;
		color: #333;
		text-align: center;
	}

	.info-item {
		padding: 12px 8px;
		border-bottom: 1px solid #ccc;
		display: flex;
		align-items: center;
		justify-content: space-between;

		text {
			font-size: 14px;
			text-align: right;
		}

		.order-no {
			font-size: 12px;
			font-weight: 600;
		}

		.info-label {
			font-weight: bold;
			color: #666;
			margin-right: 10px;
			font-size: 12px;
			text-align: left;
		}


	}



	.status {
		font-size: 16px;
		font-weight: bold;
		margin-top: 20px;
		text-align: center;
	}

	.status-paid {
		color: #5cb85c;
		/* 绿色 */
	}

	.status-shipped {
		color: #5bc0de;
		/* 蓝色 */
	}

	.btn {
		text-align: center;
		padding: 8px 12px;
		border: 1px solid #ccc;
		border-radius: 4px;
		color: #66948a;
	}

	.image-info {
		display: flex;
		justify-content: center;
		align-items: center;

		.qrcode {
			width: 300px;
			height: 300px;
		}
	}
</style>