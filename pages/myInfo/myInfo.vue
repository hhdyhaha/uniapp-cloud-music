<template>
	<view class="">
		<!-- 登录 -->
		<commonLogin></commonLogin>
	</view>
</template>

<script>
	// 引入登录页面
	import CommonLogin from "@/components/commonLogin/commonLogin.vue"
	
export default	{
	name:'我的',
	comments:{
		// 登录页面
		CommonLogin
	}
}
</script>

<style>
</style>
