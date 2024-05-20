<template>
	<view class="title">订单状态总数量</view>
	<canvas canvas-id="column" id="column" class="charts" @touchend="tap" />
	<view class="title">每日订单数量</view>
	<canvas canvas-id="column1" id="column1" class="charts" @touchend="tap" />
	<view class="title">发货城市</view>
	<canvas canvas-id="column2" id="column2" class="charts" @touchend="tap" />
	<view class="title">收货城市</view>
	<canvas canvas-id="column3" id="column3" class="charts" @touchend="tap" />
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { onReady } from '@dcloudio/uni-app'
	import uCharts from '../../uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.min.js';
	import { logisticsList } from '../../api/logistics.js';
	const uChartsInstance = {};
	const cWidth = ref(750)
	const cHeight = ref(500)

	onReady(() => {
		//这里的 750 对应 css .charts 的 width
		cWidth.value = uni.upx2px(750);
		//这里的 500 对应 css .charts 的 height
		cHeight.value = uni.upx2px(500);
		// getServerData();
		loadOrderList()
	})

	const loadOrderList = async () => {
		let data : any = await logisticsList({})
		if (data) {
			const statusCount = {
				"待发货": 0,
				"已发货": 0,
				"已完成": 0
			}
			const ordersPerDay = {};
			const senderCities = {};
			const receiverCities = {};

			data.forEach(order => {
				const date = order.createAt.split('T')[0];
				const senderCity = order.senderRegion.split(',')[1]; // 提取发货城市
				const receiverCity = order.receiverRegion.split(',')[1]; // 提取收货城市
				if (senderCities[senderCity]) {
					senderCities[senderCity]++;
				} else {
					senderCities[senderCity] = 1;
				}

				if (receiverCities[receiverCity]) {
					receiverCities[receiverCity]++;
				} else {
					receiverCities[receiverCity] = 1;
				}
				if (ordersPerDay[date]) {
					ordersPerDay[date]++;
				} else {
					ordersPerDay[date] = 1;
				}
				if (order.status === "100") {
					statusCount["待发货"]++;
				} else if (order.status === "200") {
					statusCount["已发货"]++;
				} else if (order.status === "300") {
					statusCount["已完成"]++;
				}
			});
			const res = {
				categories: ['待发货', '已发货', '已完成'],
				series: [
					{
						name: '订单状态数量',
						data: [statusCount["待发货"], statusCount["已发货"], statusCount["已完成"]]
					}
				]
			}
			drawCharts('column', res);

			const dates = Object.keys(ordersPerDay).sort();
			const lineRes = {
				categories: dates.map(date => {
					const d = new Date(date);
					return `${d.getMonth() + 1}-${d.getDate()}`;
				}),
				series: [{
					name: '每日订单数量',
					data: dates.map(date => ordersPerDay[date])
				}]
			}

			initBarChart('column1', lineRes);

			const senderCityData = Object.entries(senderCities).map(([city, count]) => ({ name: city, value: count }));
			console.log(senderCityData)
			pipeChart("column2", senderCityData)
			const receiverCityData = Object.entries(receiverCities).map(([city, count]) => ({ name: city, value: count }));

			pipeChart("column3", receiverCityData)
		}
	}

	const drawCharts = (id, data) => {
		const ctx = uni.createCanvasContext(id, this);
		uChartsInstance[id] = new uCharts({
			type: "column",
			context: ctx,
			width: cWidth.value,
			height: cHeight.value,
			categories: data.categories,
			series: data.series,
			animation: true,
			background: "#FFFFFF",
			padding: [15, 15, 0, 5],
			xAxis: {
				disableGrid: false
			},
			yAxis: {
				data: [{ min: 0 }]
			},
			extra: {
				column: {
					type: "group"
				}
			}
		});
	}
	const initBarChart = (id, data) => {
		const ctx = uni.createCanvasContext(id, this);
		uChartsInstance[id] = new uCharts({
			type: 'line',
			context: ctx,
			width: cWidth.value,
			height: cHeight.value,
			categories: data.categories,
			series: data.series,
			xAxis: {
				disableGrid: true
			},
			yAxis: {
				gridType: "数量",
				dashLength: 2
			},
			extra: {
				line: {
					type: "curve",
					width: 2,
					activeType: "hollow"
				}
			}
		});
	}

	const pipeChart = (id, data) => {
		const ctx = uni.createCanvasContext(id, this)
		uChartsInstance[id] = new uCharts({
			type: 'pie',
			context: ctx,
			width: cWidth.value,
			height: cHeight.value,
			series: [{ name: "城市", data: data }],
			padding: [5, 5, 5, 5],
			enableScroll: false,
			extra: {
				pie: {
					activeOpacity: 0.5,
					activeRadius: 10,
					offsetAngle: 0,
					labelWidth: 15,
					border: true,
					borderWidth: 3,
					borderColor: "#FFFFFF",
					linearType: "custom"
				}
			}
		})
	}

	const tap = (e) => {
		uChartsInstance[e.target.id].touchLegend(e);
		uChartsInstance[e.target.id].showToolTip(e);
	}
</script>

<style lang="less" scoped>
	.title {
		font-size: 14px;
		font-weight: bold;
		padding: 8px 12px;
	}

	.charts {
		width: 750rpx;
		height: 500rpx;
	}
</style>