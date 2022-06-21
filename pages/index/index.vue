<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<!-- 在页面最下方添加占位视图，高度等于 tabBar 的高度 -->
				<view class="edgeInsetBottom"></view>
				<!-- 绝对定位的视图需要考虑 tabBar 遮挡的问题，bottom 应该加上 tabBar 的高度 -->
				<view class="fixedView">
					
				</view>
	</view>
</template>

<script>
	import zaudio from "@/components/uniapp-zaudio/zaudio.vue";
	
	export default {
		components: {
			zaudio: zaudio,
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.edgeInsetBottom {
			width: 750rpx;
	height: var(--window-bottom);
			background-color: #FFFFFF;
		}
		
		.fixedView{
			position: fixed;
			width: 750rpx;
			height: 30px;
			background-color: #4CD964;
			bottom: var(--window-bottom);
		}
</style>
