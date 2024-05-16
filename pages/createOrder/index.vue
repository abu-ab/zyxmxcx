<template>
	<view class="container">
		<!-- 寄件人信息 -->
		<view class="section">
			<view class="title-content">
				<view class="title">寄件人信息</view>
				<view class="address-book" @click="addressBoook">地址簿</view>
			</view>
			<view class="input-group">
				<label>姓名：</label>
				<input v-model="formData.senderName" type="text" placeholder="请输入寄件人姓名" />
			</view>
			<view class="input-group">
				<label>手机号：</label>
				<input v-model="formData.senderPhone" type="tel" placeholder="请输入寄件人手机号" maxlength="11" />
			</view>
			<view class="input-group">
				<label>省市区：</label>
				<regionPicker :regionList="regionList" :defaultValue="formData.senderRegion" class="input"
					:change="changeRegion" :keyValue="'senderRegion'">
				</regionPicker>
			</view>
			<view class="input-group">
				<label>详细地址：</label>
				<input v-model="formData.senderAddress" type="text" placeholder="请输入寄件人详细地址" />
			</view>
		</view>

		<!-- 收件人信息 -->
		<view class="section">
			<view class="title-content">
				<view class="title">收件人信息</view>
				<view class="address-book">地址簿</view>
			</view>
			<view class="input-group">
				<label>姓名：</label>
				<input v-model="formData.receiverName" type="text" placeholder="请输入收件人姓名" />
			</view>
			<view class="input-group">
				<label>手机号：</label>
				<input v-model="formData.receiverPhone" type="tel" placeholder="请输入收件人手机号" maxlength="11" />
			</view>
			<view class="input-group">
				<label>省市区：</label>
				<regionPicker :regionList="regionList" :defaultValue="formData.receiverRegion" class="input"
					:change="changeRegion" :keyValue="'receiverRegion'">
				</regionPicker>
			</view>
			<view class="input-group">
				<label>详细地址：</label>
				<input v-model="formData.receiverAddress" type="text" placeholder="请输入收件人详细地址" />
			</view>
		</view>
		<view class="section">
			<view class="title">快递信息</view>
			<view class="input-group">
				<label>快递公司：</label>
				<input v-model="formData.expressCompany" type="text" placeholder="请输入快递公司" />
			</view>
			<view class="input-group">
				<label>运单号：</label>
				<input v-model="formData.waybillNumber" type="tel" placeholder="请输入运单号" />
			</view>
		</view>
		<view class="submit-section">
			<button @click="submitOrder">提交订单</button>
		</view>
		<popupBottom ref="popup" v-model:visible="popupVisible" title="标题" radius="40" maxHeight="900" @close="onClose"
			@reachBottom="onPopupReachBottom">
			<view class="cot">内容</view>
		</popupBottom>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue';
	import { getRegionList } from '../../api/region';
	import regionPicker from "../../components/regionPicker.vue"
	import popupBottom from "../../components/px-popup-bottom/px-popup-bottom.vue"
	import { createLogistics } from '../../api/logistics';

	const popupVisible = ref(false);
	const popup = ref();
	const regionList : any = ref([])
	const formData = reactive({
		senderName: '',
		senderPhone: '',
		senderRegion: [],
		senderAddress: '',
		receiverPhone: '',
		receiverRegion: [],
		receiverAddress: '',
		receiverName: "",
		expressCompany: "",
		waybillNumber: ""
	});



	const changeRegion = (item, key) => {
		formData[key] = item
	}

	const submitOrder = async () => {
		const params = JSON.parse(JSON.stringify(formData))
		const userInfo = uni.getStorageSync("userInfo")
		params.senderRegion = params.senderRegion.join(",")
		params.receiverRegion = params.receiverRegion.join(",")
		params.userId = userInfo.id
		console.log(params)
		let res = await createLogistics(params)

		if (typeof res == "boolean") {
			uni.redirectTo({
				url: "/pages/orderList/index"
			})
		}
	}

	const addressBoook = () => {
		console.log(123123)
		popupVisible.value = true;
		popup.value.setContViewHeight();
	}

	onMounted(async () => {
		let res = await getRegionList()
		regionList.value = res
		// selectCurrentRegion()
		console.log(res)
	})
</script>

<style lang="less" scoped>
	.container {
		padding: 12px 20px;
		position: relative;
		height: 100vh;
		box-sizing: border-box;

		.section {
			margin-bottom: 20px;

			.title-content {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					font-size: 16px;
					font-weight: 600;
				}

				.address-book {
					padding: 4px 8px;
					border: 1px solid #ccc;
					border-radius: 4px;
					font-size: 12px;
				}
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
			bottom: 50px;
			width: calc(100% - 40px);
			background-color: #167351;
			color: #fff;
			border: none;
			border-radius: 5px;
		}
	}
</style>