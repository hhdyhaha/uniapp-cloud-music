<template>
	<view class="">
		<zaudio theme="theme3" v-if="playSong"></zaudio>
		<!-- 我喜欢的音乐卡片 -->
		<uni-section type="line" v-else>
			<uni-card title="我喜欢的音乐">
				<view class="myEnjoyBox" v-for="(item,index) in songs" :key="item.id" @click="getListSongUrl(item)">
					<p>{{index+1}}</p>
					<image style="width: 40rpx;height: 40rpx;" :src="item.al.picUrl"></image>
					<p>{{item.name}}</p>
				</view>
			</uni-card>
		</uni-section>

	</view>
</template>

<script>
	import zaudio from "@/components/uniapp-zaudio/zaudio.vue";
	// 引入axios请求
	import {
		getSongUrl
	} from "@/http/api/playList.js";

	export default {
		components: {
			zaudio: zaudio,
		},
		data() {
			return {
				// 歌单详情
				songs: [],
				// 歌曲url
				songUrl: "",
				title: "",
				singer: "",
				coverImgUrl: "",
				song: [],
				playSong:false
			};
		},
		onLoad: function(options) {
			let songs = JSON.parse(decodeURIComponent(options.songs));
			this.songs = songs
			this.$zaudio.updateAudio(songs)
		},
		methods: {
			// 点击获取音乐url并添加到数组中
			async getListSongUrl(item) {
				// 歌曲id
				let songId = item.id;
				// 发送请求歌曲url
				await getSongUrl(songId).then((response) => {
					// 歌曲Id
					let songId = response.data.data[0].id;
					let songUrl = response.data.data[0].url;
					// 向数组中添加数据
					this.song.push({
						src: songUrl,
						title: item.name,
						siger: item.ar[0].name,
						coverImgUrl: item.al.picUrl,
					});
				});
				
				this.$zaudio.setAudio(this.song); //添加音频
				this.$zaudio.setRender(this.song.length - 1); //渲染第一首音频
				this.playSong = true
				console.log(this.$zaudio.audiolist,'当前的音频列表数据'); //获取当前的音频列表数据
						
			},
		},

		async mounted() {
			console.log("1");
			// 向数组中添加歌单中第一首歌
			const element = this.songs[0];
			let songId = element.id;
			await getSongUrl(songId).then((response) => {
				let songUrl = response.data.data[0].url;
				// 向数组中添加数据
				this.song.push({
					src: songUrl,
					title: element.name,
					siger: element.ar[0].name,
					coverImgUrl: element.al.picUrl,
				});
			});

			console.log("2");
			this.$zaudio.setAudio(this.song); //添加音频
			this.$zaudio.setRender(0); //渲染第一首音频
			console.log("即时21");
		},
		
		onPullDownRefresh(){
			this.playSong = false
		}
	};
</script>

<style lang="less" scoped>
	.myEnjoyBox {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		p {
			margin-top: 20rpx;
			margin-left: 10rpx;
		}

		image {
			margin-top: 20rpx;
			border-radius: 60rpx;
			margin-left: 10rpx;
		}
	}
</style>
