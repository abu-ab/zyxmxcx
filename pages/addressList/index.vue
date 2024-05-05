<template>
	<scroll-view class="list">
		<view class="list-item">
			<view class="top">
				<view class="initial">我</view>
				<view class="name">刘健飞</view>
				<view class="phone">18913279983</view>
			</view>
			<view class="content">
				<view class="txt">
					江苏省苏州市吴中区石湖之韵130栋202
				</view>
				<image src="../../static/edit.png" class="edit"></image>
			</view>
		</view>
		<view class="list-item">
			<view class="top">
				<view class="initial">我</view>
				<view class="name">刘健飞</view>
				<view class="phone">18913279983</view>
			</view>
			<view class="content">
				<view class="txt">
					江苏省苏州市吴中区石湖之韵130栋202
				</view>
				<image src="../../static/edit.png" class="edit"></image>
			</view>
		</view>
		<view class="list-item">
			<view class="top">
				<view class="initial">我</view>
				<view class="name">刘健飞</view>
				<view class="phone">18913279983</view>
			</view>
			<view class="content">
				<view class="txt">
					江苏省苏州市吴中区石湖之韵130栋202
				</view>
				<image src="../../static/edit.png" class="edit"></image>
			</view>
		</view>
		<view class="list-item">
			<view class="top">
				<view class="initial">我</view>
				<view class="name">刘健飞</view>
				<view class="phone">18913279983</view>
			</view>
			<view class="content">
				<view class="txt">
					江苏省苏州市吴中区石湖之韵130栋202
				</view>
				<image src="../../static/edit.png" class="edit"></image>
			</view>
		</view>
		<view class="list-item">
			<view class="top">
				<view class="initial">我</view>
				<view class="name">刘健飞</view>
				<view class="phone">18913279983</view>
			</view>
			<view class="content">
				<view class="txt">
					江苏省苏州市吴中区石湖之韵130栋202
				</view>
				<image src="../../static/edit.png" class="edit"></image>
			</view>
		</view>
		<view class="footer"></view>
	</scroll-view>

</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
	.list {
		background: #eee;
		height: 100vh;

		.list-item {
			background: #fff;
			border-radius: 5px;
			padding: 16px;
			margin: 12px;

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
					margin-left: 24px;
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