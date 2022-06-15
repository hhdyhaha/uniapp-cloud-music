<template>
	<view class="">
		<view class="login" v-if="rlogin">
			<!-- 登录 -->
			<commonLogin></commonLogin>
		</view>
		<!-- 我的页面 -->
		<view v-else>
			<!-- 个人信息卡片 -->
			<uni-section type="line">
				<uni-card>
					<p>D违章动物</p>
					<p>5关注 3粉丝 Lv.8</p>
				</uni-card>
			</uni-section>
			<!-- 我喜欢的音乐卡片 -->
			<uni-section type="line">
				<uni-card title="我喜欢的音乐">
					<p>我喜欢的音乐</p>
				</uni-card>
			</uni-section>
			<!-- 创建歌单卡片 -->
			<uni-section type="line">
				<uni-card title="创建歌单">
					<ul>
						<li>2019年度歌单</li>
						<li>2020年度歌单</li>
						<li>2021年度歌单</li>
					</ul>
				</uni-card>
			</uni-section>
			<!-- 收藏歌单卡片 -->
			<uni-section type="line">
				<uni-card title="收藏歌单">
					<ul>
						<li>收藏歌单1</li>
						<li>收藏歌单2</li>
						<li>收藏歌单3</li>
					</ul>
				</uni-card>
			</uni-section>
		</view>
	</view>

</template>

<script>
	// 引入登录页面
	import CommonLogin from "@/components/commonLogin/commonLogin.vue"

	export default {
		data() {
			return {
				// 控制是否是登录页面,默认为false
				rlogin: true
			}
		},
		components: {
			// 登录页面
			CommonLogin
		},
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS
			// token标志来判断
			let token = uni.getStorageSync('token');
			console.log('获取到的数据缓存中的token')
			console.log(token)
			let _this = this
			if (token) {
				//不存在则跳转至登录页
				uni.reLaunch({
					url: "/pages/login/login",
					success: () => {
						_this.$store.commit("login/loginState", _this.rlogin)
						plus.navigator.closeSplashscreen();
					}
				})
			} else {
				this.rlogin = false
				//存在则关闭启动页进入首页
				plus.navigator.closeSplashscreen();
			}
			// #endif
		}
	}
</script>

<style>
</style>
