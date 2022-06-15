<template>
	<view class="content">
		<view class="content">
			<image :class="avatarNoRound ? 'logo2':'logo'" :src="avatar"></image>
			<view class="info">
				<view class="appname">{{appName}}</view>
				<view class="version">{{versionName}}</view>
			</view>

			<view class="layout">
				<input v-model="account" placeholder="请输入手机号" class="input_css" />
				<icon type="clear" size="20" class="clear" @click="doClear(1)" v-show="account && account.length>0">
				</icon>
			</view>
			<view class="layout">
				<input password="true" v-model="password" placeholder="请输入密码" class="input_css" />
				<icon type="clear" size="20" class="clear" @click="doClear(2)" v-show="password && password.length>0">
				</icon>
			</view>

			<view v-if="loginInfo && loginInfo.length>0">
				<view class="size_m_s tc999" @click="()=>{showLoginInfo = !showLoginInfo}">
					{{showLoginInfo ? '常用账号列表':'选择常用账号'}}
				</view>
				<view v-if="showLoginInfo">
					<view class="size_m_s margin_bottom_10 tc333" v-for="(item,index) in loginInfo" v-bind:key="index"
						@click="doSelectLoginInfo(item)">
						<view>{{item.account}}</view>
					</view>
				</view>
			</view>

			<view v-if="isShowSex">
				<radio-group class="radio_style">
					<radio value="1" checked="true">少侠</radio>
					<radio value="2" class="mar">女侠</radio>
				</radio-group>
			</view>

			<view v-if="error" class="error">{{error}}</view>
			<view class="btn" @click="doLogin">{{loginBtnText}}</view>
			<!-- <view class="btn_un" @click="doBack">{{unLoginBtnText}}</view>	 -->
			<!-- <view v-if="isNeedUnlogin" class="btn_un" @click="doLoginDelay">暂不登录</view> -->

			<!-- <view class="third_title" v-if="loginWeChat || loginApple">第三方登录</view> -->
			<view class="third_view" v-if="loginWeChat || loginApple">
				<image v-if="loginWeChat" class="third_item" src="./wechat.png"></image>
				<image v-if="loginApple" class="third_item" src="./apple.png"></image>
			</view>
		</view>

		<view class="right_view">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import {
		getLoginInfo
	} from '@/http/api/login.js';
	const app = getApp();
	export default {
		data() {
			return {
				account: undefined,
				password: undefined,
				sex: 1,
				error: "",
				showLoginInfo: false,
			}
		},
		props: {
			"loginInfo": {
				type: Array,
				default: [],
			},
			loginApple: {
				type: Boolean,
				default: false,
			},
			loginWeChat: {
				type: Boolean,
				default: false,
			},
			avatarNoRound: {
				type: Boolean,
				default: false,
			},
			backageImage: {
				type: String,
				default: ""
			},
			isShowSex: {
				type: Boolean,
				default: false,
			},
			avatar: {
				type: String,
				default: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdiy.qqjay.com%2Fu%2Ffiles%2F2012%2F0217%2Fb693a3b6d232ffe861da22287c888729.jpg&refer=http%3A%2F%2Fdiy.qqjay.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623147216&t=a2af93e9fdced335cca87e4a4c77ca24",
			},
			loginBtnText: {
				type: String,
				default: "登录"
			},
			unLoginBtnText: {
				type: String,
				default: "暂不登录"
			},
			appName: {
				type: String,
				default: ""
			},
			versionName: {
				type: String,
				default: "v1.0"
			},
			checkVaild: {
				type: Boolean,
				default: true
			},
			isNeedUnlogin: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			doSelectLoginInfo(data) {
				this.account = data.account;
				this.password = data.password;
			},
			doClear(type) {
				if (type === 1)
					this.account = '';
				else
					this.password = '';
			},
			setAccount(account, password) {
				this.account = account;
				this.password = password;
			},
			onSexChange(e) {
				this.sex = e.detail.value;
			},
			doLogin() {
				// 是否校验账号密码完整性
				if (this.$props.checkVaild) {
					if (!this.account) {
						this.error = "请输入账号！";
						return;
					}
					if (!this.password) {
						this.error = "请输入密码！";
						return;
					}
				}
				let data = {
					phone: this.account,
					password: this.password,
					sex: this.sex
				}
				console.log(this.account)
				getLoginInfo(data).then((response) => {
					// 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
					try {
						uni.setStorageSync('token', response.data.token);
						let token = uni.getStorageSync('token');
						if (token) {			
							//存在则关闭启动页进入首页
							plus.navigator.closeSplashscreen();
						} else {
							//不存在则跳转至登录页
							uni.reLaunch({
								url: "/pages/login/login",
								success: () => {
									// 关闭启动页面
									plus.navigator.closeSplashscreen();
								}
							})
						}
						// #endif
					} catch (e) {
						// error
					}
				}).catch((error) => {
					console.log("请求失败返回的数据")
					console.log(error)
				})
			},
			// 暂不登录
			// doLoginDelay(){

			// 	this.$emit("doLoginDelay",{});
			// },
			// 暂不登录
			// doBack(){
			// 	this.$emit("doCancel",{account:this.account,password:this.password,sex:this.sex});
			// }
		}
	}
</script>

<style>
	@import url("login.css");
</style>
