<template>
	<view class="page-body" :style="{height:props.noFull?'100%':'100vh'}">
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="covers" :polyline="polyline"
			:scale="scale" :show-location="false" @tap="handleMapTap"></map>
		<cover-view class="path-content" v-if="show">
			<scroll-view scroll-y style="height: 100%;">
				<cover-view class="title">
					轨迹描述
					<cover-image src="../../static/zoom.png" class="zoom" @click="zoom"></cover-image>
				</cover-view>
				<cover-view class="path-item" v-for="(item,index) in pathItem" :key="index">
					<cover-view class="info">
						<cover-view class="name">{{item.operatorName}}</cover-view>
						<cover-view class="phone">{{item.operatorPhone}}</cover-view>
					</cover-view>
					<cover-view class="address">
						{{item.addressLine}}
						<button class="del" @click.stop="deletePath(index)">删除</button>
					</cover-view>
				</cover-view>
			</scroll-view>
		</cover-view>
		<cover-view v-if="!props.noFull&&order.status!='300'" class="btn" @click="add">添加物流轨迹</cover-view>
	</view>

</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { geocoder } from "../../api/txApi";
	import { onLoad } from "@dcloudio/uni-app"
	import { addPath, pathList } from "../../api/orderPath";
	import { logistDetail } from "../../api/logistics";
	const id = ref("")
	const props : any = defineProps(["noFull"]);
	const show = ref(false)
	const scale = ref(7);
	const latitude = ref(39.909);
	const longitude = ref(116.39742);
	const covers = ref([]);
	const pathItem = ref([])
	const order : any = ref({})
	const polyline = ref([
		{
			points: [
			],
			color: "#FF0000DD",
			width: 2,
			dottedLine: true,
		},
	]);
	const isFlag = ref(false);
	const handleMapTap = async (event : any) => {
		if (props.noFull || order.value.status == '300') return;
		// console.log(isFlag.value);
		// if (isFlag.value) {
		//   isFlag.value = false;
		//   return;
		// }
		console.log(event);
		const { latitude, longitude } = event.detail;
		// 添加新节点到covers
		console.log("latitude", latitude, "longitude", longitude);
		covers.value.push({
			latitude,
			longitude,
			height: 20,
			width: 20,
			id: covers.value.length + 1,
		});
		// 添加新节点到polyline
		polyline.value[0].points.push({
			latitude,
			longitude,
		});
		let res : any = await geocoder(`${latitude},${longitude}`)
		console.log(res)
		const userInfo = uni.getStorageSync("userInfo")
		if (res) {
			const component = res.result.address_component
			pathItem.value.push({
				orderId: id.value,
				province: component.province,
				city: component.city,
				district: component.district,
				addressLine: res.result.address,
				longitude: longitude,
				latitude: latitude,
				operatorId: userInfo.id,
				operatorName: userInfo.name,
				operatorPhone: userInfo.phone
			})
		}

		console.log(pathItem.value)

	};
	const deletePath = (index) => {
		pathItem.value.splice(index, 1)
		polyline.value[0].points.splice(index, 1)
		covers.value.splice(index, 1)
	}
	const add = async () => {
		if (show.value) {
			let res : any = await addPath(pathItem.value)
			if (res) {
				console.log(res)
				uni.navigateBack()
			}
		}
		show.value = true

	}
	const zoom = () => {
		show.value = false
	}
	const onMarkerTap = (e : any) => {
		// console.log(e);
		// // isFlag.value = true;
		// console.log("onMarkerTap");
		// const markerId = e.detail.markerId;
		// const existingMarkerIndex = covers.value.findIndex(
		//   (cover) => cover.id === markerId
		// );
		// covers.value.splice(existingMarkerIndex, 1);
	};

	const loadPath = async (id) => {
		let res : any = await pathList(id)
		console.log(res)
		if (res) {
			console.log(res)
			for (let i = 0; i < res.length; i++) {
				covers.value.push({
					latitude: res[i].latitude,
					longitude: res[i].longitude,
					height: 20,
					width: 20,
					id: covers.value.length + 1,
				});
				// 添加新节点到polyline
				polyline.value[0].points.push({
					latitude: res[i].latitude,
					longitude: res[i].longitude,
				});
			}
			pathItem.value = res
		}
	}

	const loadDetail = async (id) => {
		let res = await logistDetail(id)
		console.log(res)
		order.value = res;
	}

	onLoad((e) => {
		id.value = e.id
		loadDetail(e.id)
		loadPath(e.id)
	})
</script>

<style lang="less" scoped>
	.page-body {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		position: relative;

		.map {
			width: 100%;
			height: 100%;
		}

		.btn {
			position: absolute;
			bottom: 50px;
			// left: 50%;
			// transform: translate(-50%, 0);
			height: 48px;
			width: calc(100% - 40px);
			border-radius: 12px;
			box-sizing: border-box;
			background: #3a88ff;
			text-align: center;
			line-height: 48px;
			color: #fff;
		}

		.path-content {
			position: absolute;
			bottom: 50px;
			width: calc(100% - 40px);
			height: 500px;
			background: #fff;
			border-radius: 12px;

			.title {
				font-size: 14px;
				font-weight: 600;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 8px 20px;

				.zoom {
					width: 20px;
					height: 20px;
				}
			}

			.path-item {
				padding: 12px 20px;
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid #ccc;


				.info {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 12px;
				}

				.address {
					margin-top: 8px;
					font-size: 12px;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.del {
						font-size: 12px;
						height: 24px;
						line-height: 24px;
						background: #fff;
						padding: 0 4px;
						margin: 0 0;
					}
				}
			}
		}
	}
</style>