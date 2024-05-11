<template>
	<view class="page-body">
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="covers" :polyline="polyline"
			:scale="scale" :show-location="false" @tap="handleMapTap"></map>
		<cover-view class="btn">添加物流信息</cover-view>
	</view>

</template>

<script setup lang="ts">
	import { ref } from "vue";

	const scale = ref(7);
	const latitude = ref(39.909);
	const longitude = ref(116.39742);
	const covers = ref([
		{
			latitude: 39.909,
			longitude: 116.39742,
			height: 20,
			width: 20,
			id: 1,
		},
		{
			latitude: 39.9,
			longitude: 116.39,
			height: 20,
			width: 20,
			id: 2,
		},
	]);

	const polyline = ref([
		{
			points: [
				{
					latitude: 39.909,
					longitude: 116.39742,
				},
				{
					latitude: 39.9,
					longitude: 116.39,
				},
			],
			color: "#FF0000DD",
			width: 2,
			dottedLine: true,
		},
	]);
	const isFlag = ref(false);
	const handleMapTap = (event : any) => {
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
	};
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
			bottom: 100px;
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
	}
</style>