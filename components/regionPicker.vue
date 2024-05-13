<template>
	<picker :value="selectRegion" @change="changeRegion" @columnchange="onColumnChange" mode="multiSelector" class="input"
		:range="regionRange">
		<view class="uni-input">{{selectRegionText}}</view>
	</picker>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	const props : any = defineProps(["regionList", "defaultValue", "change", "keyValue"]);

	watch(() => props.regionList, () => {
		selectCurrentRegion()
	})

	const selectRegionText = ref("")
	const selectRegion = ref([])

	const regionRange : any = ref([])

	const selectCurrentRegion = () => {
		if (!props.regionList) return
		const provinceList : string[] = [],
			cityList : string[] = [],
			districtList : string[] = []
		let provinceIndex = 0,
			cityIndex = 0,
			districtIndex = 0
		const [provinceName, cityName, districtName] = props.defaultValue
		let currentProvince = props.regionList[0]
		for (let i = 0; i < props.regionList.length; i++) {
			const province = props.regionList[i]
			provinceList.push(province.name)
			if (province.name === provinceName) {
				provinceIndex = i
				currentProvince = props.regionList[i]
			}
		}
		let currentCity = currentProvince.childList[0]
		for (let i = 0; i < currentProvince.childList?.length; i++) {
			const city = currentProvince.childList[i]
			cityList.push(city.name)
			if (city.name === cityName) {
				cityIndex = i
				currentCity = currentProvince.childList[i]
			}
		}

		for (let i = 0; i < currentCity.childList?.length; i++) {
			const district = currentCity.childList[i]
			districtList.push(district.name)
			if (district.name === districtName) {
				districtIndex = i
			}
		}
		console.log(provinceIndex, cityIndex, districtIndex)
		selectRegion.value = [provinceIndex, cityIndex, districtIndex]
		regionRange.value = [provinceList, cityList, districtList]
		selectRegionText.value = `${provinceList[provinceIndex]} ${cityList[cityIndex]} ${districtList[districtIndex]}`
	}


	const changeRegion = e => {
		selectRegion.value = e.detail.value

		const province = props.regionList[selectRegion.value[0]]
		const city = province.childList[selectRegion.value[1]]
		const district = city.childList[selectRegion.value[2]]
		selectRegionText.value = `${province.name} ${city.name} ${district.name}`
		props.change([province.name, city.name, district.name], props.keyValue)
	}

	const onColumnChange = (e) => {
		console.log(123123)
		const column = e.detail.column
		const row = e.detail.value
		switch (column) {
			case 0:
				const currentProvince = props.regionList[row]
				const firstCity = currentProvince.childList[0]
				const cityList = currentProvince.childList.map(x => x.name)
				const districtList = firstCity.childList.map(x => x.name)
				selectRegion.value = [row, 0, 0]
				regionRange.value = [regionRange[0], cityList, districtList]

				break
			case 1:
				const currentCity = props.regionList[selectRegion.value[0]].childList[row]
				const currentDistrictList = currentCity.childList.map(x => x.name)

				selectRegion.value = [selectRegion.value[0], row, 0]
				regionRange.value = [regionRange[0], regionRange[1], currentDistrictList]
				break
			case 2:
				selectRegion.value = [selectRegion.value[0], selectRegion.value[1], row]
				break
		}
	}
</script>

<style lang="less" scoped>

</style>