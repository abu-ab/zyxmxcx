<template>
	<view class="{styles.address}">
		<view class="list-item">
			<view class="item">
				<view class="label">收货人</view>
				<view class="input">
					<input placeholderClass="placeholder" placeholder="请输入收货人姓名" v-model="address.recipientName" />
				</view>
			</view>
			<view class="item">
				<view class="label">联系电话</view>
				<view class="input">
					<input placeholderClass="placeholder" placeholder="请输入联系电话" v-model="address.phoneNumber"
						maxlength="13" />
				</view>
			</view>
			<view class="item">
				<view class="label">所在地区</view>
				<regionPicker :regionList="regionList" :defaultValue="address.address" class="input"
					:change="changeRegion" :keyValue="'address'">
				</regionPicker>
			</view>
			<view class="item">
				<view class="label">详细地址</view>
				<view class="input">
					<input placeholderClass="placeholder" placeholder="请输入详细地址" v-model="address.addressLine" />
				</view>
			</view>
			<view class="item">
				<view class="label">设置为默认地址</view>
				<view class="input">
					<switch checked="{address.isDefault}" @change="switchChange" />
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="save" @click="save"> 保存收货地址 </view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { onLoad } from "@dcloudio/uni-app"
	import { addressDetail, createAddress, updateAddress } from "../../api/addressApi";
	import { getRegionList } from "../../api/region";
	import regionPicker from "../../components/regionPicker.vue"
	const regionList : any = ref([])
	let address = ref({
		id: "",
		userId: "",
		recipientName: "",
		phoneNumber: "",
		address: "",
		addressLine: "",
		province: "",
		city: "",
		district: "",
		isDefault: 0,
	});

	const changeRegion = (item, key) => {
		address.value[key] = item
	}

	const switchChange = (e) => {
		console.log(e.detail.value)
		address.value.isDefault = e.detail.value ? 1 : 0
	}

	const load = async (id) => {
		let res : any = await addressDetail(id);
		if (res) {
			res.address = [res.province, res.city, res.district];
			console.log(res.address)
			address.value = res
			console.log(address.value)
		}
	};

	const save = async () => {
		let params = JSON.parse(JSON.stringify(address.value));
		console.log(params)
		const userInfo = uni.getStorageSync("userInfo")
		params.userId = userInfo.id;
		params.province = params.address[0];
		params.city = params.address[1];
		params.district = params.address[2];
		let res;
		if (params.id) {
			res = await updateAddress(params);
		} else {
			res = await createAddress(params);
		}
		if (res) {
			uni.navigateBack()
		}
	};

	onLoad(async (e) => {

		if (e.id) {
			await load(e.id)
		}
		let res = await getRegionList()
		regionList.value = res

	})
</script>

<style lang="less" scoped>
	.address {
		.list-item {
			padding: 12px 20px;
			background-color: #fff;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 30px;
				padding: 8px 0;
				border-bottom: 1px solid #e5e5e5;

				.label {
					font-size: 14px;
					color: #333;
				}

				.input {
					font-size: 14px;
					color: #333;
					padding: 0;
					margin: 0;
					border: none;
					outline: none;
					text-align: right;

					.placeholder {
						color: #999;
						font-size: 12px;
						text-align: right;
					}
				}
			}
		}

		.footer {
			margin-top: 20px;
			display: flex;
			justify-content: center;
			align-items: center;

			.save {
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
	}
</style>