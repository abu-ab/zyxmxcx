<template>
	<scroll-view class="list">
		<view class="list-item" v-for="(item,index) in list">
			<view class="name item">用户名：{{item.name}}</view>
			<view class="phone item">手机号：{{item.phone}}</view>
			<view class="time item">创建时间：{{formatTime(item.createAt)}}</view>
			<view class="role item">
				用户角色：{{handleRole(item.role)}}
				<picker mode="selector" :range="roleMap" @change="(index)=>onRoleChange(index,item)" range-key="name">
					<view class="picker">
						修改角色
					</view>
				</picker>
			</view>
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { updateUser, userList } from '../../api/user';
	import { formatTime, roleMap, handleRole } from "../../utils/utils"
	const list : any = ref([])


	const loadList = async () => {
		let res = await userList()
		if (res) {
			console.log(res)
			list.value = res;
		}
	}

	const onRoleChange = async (e, item) => {
		const index = e.detail.value;
		const cur = roleMap[index]
		console.log(cur, item)
		item.role = cur.value
		let res = await updateUser(item)
		if (res) {
			uni.showToast({
				title: "角色修改成功",
				icon: "success"
			})
			loadList()
		}
	}
	onMounted(() => {
		loadList()
	})
</script>

<style lang="less" scoped>
	.list {
		background: #eee;
		height: 100vh;

		.list-item {
			background: #fff;
			border-radius: 5px;
			padding: 8px 16px;
			margin: 12px;

			.item {
				font-size: 14px;
				margin-bottom: 4px;

				.picker {
					font-size: 12px;
					padding: 4px;
					border: 1px solid #ccc;
					border-radius: 4px;
				}
			}

			.role {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>