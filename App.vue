<script>
	export default {
		onLaunch: function() {
			// 查看是否有token 相当于路由导航
			let token = uni.getStorageSync('token');
			if (token) {
				next()
			} else {
				uni.redirectTo({
					url: 'components/commonLogin/commonLogin'
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
