<template>
  <view class="">
    <zaudio theme="theme3"></zaudio>
    <!-- 我喜欢的音乐卡片 -->
    <uni-section type="line">
      <uni-card title="我喜欢的音乐">
        <view
          class="myEnjoyBox"
          v-for="(item,index) in songs"
          :key="item.id"
          @click="getListSongUrl(item)"
        >
          <p>{{index+1}}</p>
          <image
            style="width: 40rpx;height: 40rpx;"
            :src="item.al.picUrl"
          ></image>
          <p>{{item.name}}</p>
        </view>
      </uni-card>
    </uni-section>

  </view>
</template>

<script>
import zaudio from "@/components/uniapp-zaudio/zaudio.vue";
// 引入axios请求
import { getSongUrl } from "@/http/api/playList.js";

export default {
  components: {
    zaudio: zaudio,
  },
  data() {
    return {
      // 歌单详情
      songs: uni.getStorageSync("songs") || [],
      // 歌曲url
      songUrl: "",
      title: "",
      singer: "",
      coverImgUrl: "",
      song: [],
    };
  },
  onLoad: function (options) {
    let songs = JSON.parse(decodeURIComponent(options.songs));
    uni.setStorageSync("songs", songs);
  },
  methods: {
    getListSongUrl(item) {
      // 歌曲id
      let songId = item.id;
      // 发送请求歌曲url
      getSongUrl(songId).then((response) => {
        // 歌曲url
        let songUrl = response.data.data[0].url;
        this.songUrl = songUrl;
        // 歌曲Id
        let songId = response.data.data[0].id;
      });
    },
  },
  mounted() {
    // 向数组中添加对象
    for (let index = 0; index < this.songs.length; index++) {
      const element = this.songs[index];
      let songId = element.id;
      getSongUrl(songId).then(async (response) => {
        let songUrl = response.data.data[0].url;
        // 向数组中添加数据
         this.song.push({
          src: songUrl,
          title: element.name,
          siger: element.ar[0].name,
          coverImgUrl: element.al.picUrl,
        });
		this.$zaudio.setAudio(this.song); //添加音频
		this.$zaudio.setRender(0);
      });
    }
    // this.$zaudio.setAudio(this.song); //添加音频
    // this.$zaudio.setRender(0); //渲染第一首音频
    console.log("即时21");
  },
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
