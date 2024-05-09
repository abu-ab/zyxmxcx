<template>
	<view class="container">
		<!-- 寄件人信息 -->
		<view class="section">
			<view class="title">寄件人信息</view>
			<view class="input-group">
				<label>姓名：</label>
				<input v-model="formData.senderName" type="text" placeholder="请输入寄件人姓名" />
			</view>
			<view class="input-group">
				<label>手机号：</label>
				<input v-model="formData.senderPhone" type="tel" placeholder="请输入寄件人手机号" />
			</view>
			<view class="input-group">
				<label>省市区：</label>
				<picker :value="formData.senderRegion" @change="changeRegion" @columnchange="columnchange"
					mode="multiSelector" class="input" :range="regionList" range-key="name">
					<view class="uni-input">{{regionList[0]?.name}}</view>
				</picker>
			</view>
			<view class="input-group">
				<label>详细地址：</label>
				<input v-model="formData.senderAddress" type="text" placeholder="请输入寄件人详细地址" />
			</view>
		</view>

		<!-- 收件人信息 -->
		<view class="section">
			<view class="title">收件人信息</view>
			<view class="input-group">
				<label>姓名：</label>
				<input v-model="formData.recipientName" type="text" placeholder="请输入收件人姓名" />
			</view>
			<view class="input-group">
				<label>手机号：</label>
				<input v-model="formData.recipientPhone" type="tel" placeholder="请输入收件人手机号" />
			</view>
			<view class="input-group">
				<label>省市区：</label>
				<picker :value="formData.recipientRegion" @change="changeRegion" mode="region" class="input"></picker>
			</view>
			<view class="input-group">
				<label>详细地址：</label>
				<input v-model="formData.recipientAddress" type="text" placeholder="请输入收件人详细地址" />
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="submit-section">
			<button @click="submitOrder">提交订单</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue';
	import { getRegionList } from '../../api/region';

	const formData = reactive({
		senderName: '',
		senderPhone: '',
		senderRegion: '',
		senderAddress: '',
		recipientName: '',
		recipientPhone: '',
		recipientRegion: '',
		recipientAddress: ''
	});

	const regionList : any = ref([])

	const changeRegion = () => {
		console.log(123)
	}

	const submitOrder = () => {
		uni.redirectTo({
			url: "/pages/orderList/index"
		})
	}


	onMounted(async () => {
		let res = await getRegionList()
		regionList.value = res
		console.log(res)
	})
</script>

<style lang="less" scoped>
	.container {
		padding: 12px 20px;
		position: relative;
		height: 100vh;

		.section {
			margin-bottom: 20px;

			.title {
				font-size: 16px;
				font-weight: 600;
			}

			.input-group {
				display: flex;
				align-items: center;
				margin: 16px 0;

				label {
					width: 80px;
					text-align: left;
					font-size: 14px;
					font-weight: 500;
				}

				input,
				.input {
					flex: 1;
					padding: 4px 8px;
					border: 1px solid #ccc;
					border-radius: 5px;
					font-size: 14px;
					z-index: 999;
				}
			}
		}



		.submit-section button {
			position: absolute;
			bottom: 80px;
			width: calc(100% - 40px);
			background-color: #007aff;
			color: #fff;
			border: none;
			border-radius: 5px;
		}
	}
</style>