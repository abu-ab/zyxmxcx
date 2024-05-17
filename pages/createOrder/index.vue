<template>
	<view class="container">
		<!-- 寄件人信息 -->
		<view class="section">
			<view class="title-content">
				<view class="title">寄件人信息</view>
				<view class="address-book" @click="addressBoook('sender')">地址簿</view>
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
				<view class="address-book" @click="addressBoook('receiver')">地址簿</view>
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
		<popupBottom ref="popup" v-model:visible="popupVisible" title="请选择地址" radius="40" maxHeight="900"
			@close="onClose" @reachBottom="onPopupReachBottom">
			<view class="list-item" v-for="(item,index) in addressLists" :key="index" @click="addAddress(item)">
				<view class="top">
					<view class="name">{{item.recipientName}}</view>
					<view class="phone">{{item.phoneNumber}}</view>
				</view>
				<view class="content">
					<view class="txt" :style="{'marginLeft':'8px'}">
						{{ item.province }}{{ item.city }}{{ item.district }}{{ item.addressLine }}
					</view>
				</view>
			</view>
		</popupBottom>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { getRegionList } from '../../api/region';
	import regionPicker from "../../components/regionPicker.vue"
	import popupBottom from "../../components/px-popup-bottom/px-popup-bottom.vue"
	import { createLogistics } from '../../api/logistics';
	import { addressList } from '../../api/addressApi';

	const popupVisible = ref(false);
	const popup = ref();
	const regionList : any = ref([])
	const formData = ref({
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
	const addressLists : any = ref([])
	const type = ref("")


	const changeRegion = (item, key) => {
		formData.value[key] = item
	}

	const submitOrder = async () => {
		const params = JSON.parse(JSON.stringify(formData.value))
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

	const addressBoook = (item) => {
		console.log(123123)
		type.value = item
		popupVisible.value = true;
		popup.value.setContViewHeight();
	}

	const loadAddressList = async () => {
		const userInfo = uni.getStorageSync("userInfo")
		let res = await addressList(userInfo.id)
		if (res) {
			console.log(res)
			addressLists.value = res
		}
	}


	const addAddress = (item) => {
		console.log(item)
		if (type.value === "sender") {
			formData.value.senderName = item.recipientName
			formData.value.senderPhone = item.phoneNumber
			formData.value.senderRegion = [item.province, item.city, item.district]
			formData.value.senderAddress = item.addressLine
		} else if (type.value === "receiver") {
			formData.value.receiverName = item.recipientName
			formData.value.receiverPhone = item.phoneNumber
			formData.value.receiverRegion = [item.province, item.city, item.district]
			formData.value.receiverAddress = item.addressLine
		}
		popupVisible.value = false;
	}

	onMounted(async () => {
		let res = await getRegionList()
		regionList.value = res
		// selectCurrentRegion()
		loadAddressList()
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

		.list-item {
			background: #fff;
			border-radius: 5px;
			padding: 12px 16px;
			border-bottom: 1px solid #ccc;

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
</style>