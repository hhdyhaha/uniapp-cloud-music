<script>
	export default {
		onLaunch: function() {
			// 查看是否有token 相当于路由导航
			let token = uni.getStorageSync('token');
			if (token) {
				next()
				// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
				// uni.switchTab({
				// 	url: 'pages/index/index'
				// })
			} else {
				// 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
				uni.navigateTo({
					url: 'pages/myInfo/myInfo'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
