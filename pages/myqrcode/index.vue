<template>
	<view>我的二维码</view>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import VueQrcode from '@chenfengyuan/vue-qrcode';
	const val = ref("1234567890128")
	const show = ref(true)
	const barresult = () => {
	}
</script>

<style lang="less" scoped>
</style>