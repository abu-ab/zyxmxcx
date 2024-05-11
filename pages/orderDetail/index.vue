<template>
	<view class="container">
		<view class="order-info">
			<text class="title">订单详情</text>
			<view class="info-item">
				<text>订单编号:</text>
				<text>{{ order.id }}</text>
			</view>
			<view class="info-item">
				<text>下单时间:</text>
				<text>{{ formatTime(order.createdAt) }}</text>
			</view>
			<view class="info-item">
				<text>发件人:</text>
				<text>{{ order.senderName }}</text>
				<text>{{ order.senderPhone }}</text>
				<text>{{ order.senderRegion }}</text>
				<text>{{ order.senderAddress }}</text>
			</view>
			<view class="info-item">
				<text>收件人:</text>
				<text>{{ order.receiverName }}</text>
				<text>{{ order.receiverPhone }}</text>
				<text>{{ order.receiverRegion }}</text>
				<text>{{ order.receiverAddress }}</text>
			</view>
			<view class="info-item">
				<text>快递公司:</text>
				<text>{{ order.expressCompany }}</text>
			</view>
			<view class="info-item">
				<text>运单号:</text>
				<text>{{ order.waybillNumber }}</text>
			</view>
			<text class="status"
				:class="{ 'status-paid': order.status === '100', 'status-shipped': order.status === '200' }">{{ getStatusText(order.status) }}</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive } from 'vue';
	const order = reactive({
		createAt: "2024-05-11T10:52:09.000+00:00",
		deliveryTime: null,
		expressCompany: "京东",
		id: "03a97af0dacba1677eeadb7c459c65c2",
		receiverAddress: "测测",
		receiverName: "小红",
		receiverPhone: "19000000000",
		receiverRegion: "天津市,天津城区,和平区",
		senderAddress: "测测",
		senderName: "小绿",
		senderPhone: "18000000000",
		senderRegion: "河北省,石家庄市,长安区",
		shippingTime: null,
		status: "100",
		userId: "557b87b158ff22461e108b54661b8559",
		waybillNumber: "3213123"
	})

	const formatTime = (time) => {
		return new Date(time).toLocaleString();
	}
	const getStatusText = (status) => {
		if (status === '100') return '待发货';
		else if (status === '200') return '已发货';
		else return '未知状态';
	}
</script>

<style lang="less" scoped>
	.container {
		padding: 20px;
	}

	.order-info {
		background-color: #f0f2f5;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.title {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.info-item {
		margin-bottom: 15px;
	}

	.info-item text:first-child {
		font-weight: bold;
		margin-right: 5px;
	}

	.status {
		font-size: 18px;
		font-weight: bold;
		margin-top: 20px;
	}

	.status-paid {
		color: #5cb85c;
		/* 绿色 */
	}

	.status-shipped {
		color: #5bc0de;
		/* 蓝色 */
	}
</style>