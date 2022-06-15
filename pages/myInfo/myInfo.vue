<template>
  <view class="">
    <view
      class="login"
      v-if="rlogin"
    >
      <!-- 登录 -->
      <commonLogin></commonLogin>
    </view>
    <!-- 我的页面 -->

    <view v-else>
      <view class="header">
        <!-- 头像 -->
        <view class="avatar">
          <image
            class="avatar-img"
            :src="avatarUrl"
          ></image>
        </view>
        <!-- 个人信息卡片 -->
        <uni-section type="line">
          <uni-card>
            <view>
              <uni-col
                class="account"
                :span="12"
                :offset="6"
              >
                <view>
                  {{nickName}}
                </view>
              </uni-col>
              <uni-col
                class="signature"
                :span="12"
                :offset="6"
              >
                <view>
                  {{signature}}
                </view>
              </uni-col>
            </view>

          </uni-card>
        </uni-section>

      </view>

      <!-- 我喜欢的音乐卡片 -->
      <uni-section type="line">
        <uni-card title="我喜欢的音乐">
          <p>我喜欢的音乐</p>
        </uni-card>
      </uni-section>
      <!-- 创建歌单卡片 -->
      <uni-section type="line">
        <uni-card :title="createdPlaylistCount">
          <view>

            <uni-col
              class="account"
              :span="12"
              :offset="6"
            >
              <view>
                <ul>
                  <li>2019年度歌单</li>
                  <li>2020年度歌单</li>
                  <li>2021年度歌单</li>
                </ul>
              </view>
            </uni-col>
          </view>

        </uni-card>
      </uni-section>
      <!-- 收藏歌单卡片 -->
      <uni-section type="line">
        <uni-card :title="subPlaylistCount">
          <view>

            <uni-col
              class="account"
              :span="12"
              :offset="6"
            >
              <view>
                <ul>
                  <li>收藏年度歌单</li>
                  <li>收藏2020年度歌单</li>
                  <li>收藏2021年度歌单</li>
                </ul>
              </view>
            </uni-col>
          </view>

        </uni-card>
      </uni-section>
    </view>
  </view>

</template>

<script>
// 引入登录页面
import CommonLogin from "@/components/commonLogin/commonLogin.vue";
// 引入axios请求
import {
  getMyInfo,
  getPlaylistCount,
  getPlayLists,
  getPlayListsDetail,
} from "@/http/api/myInfo.js";

export default {
  data() {
    return {
      // 控制是否是登录页面,默认为false
      rlogin: true,
      // 头像
      avatarUrl: "",
      // 账户名称
      nickName: "",
      // 签名
      signature: "",
      // uid
      userId: "",
      // 背景图片
      backgroundUrl: "",
      // 创建歌单数量
      createdPlaylistCount: "",
      // 收藏歌单数量
      subPlaylistCount: "",
      // 创建歌单 第一个为我喜欢的音乐
      createdPlaylist: [],
      // 收藏歌单
      subPlaylist: [],
      //   我喜欢的音乐
      myEnjoy: [],
    };
  },
  components: {
    // 登录页面
    CommonLogin,
  },
  // 监听页面加载，其参数为上个页面传递的数据

  onLoad: function () {
    // token标志来判断
    let token = uni.getStorageSync("token");
    // 如果token存在显示我的信息,否则显示登录页面
    if (token) {
      this.rlogin = false;
    } else {
      this.rlogin = true;
    }
    // 账户信息
    getMyInfo().then((response) => {
      let userState = response.data.data.profile;
      this.avatarUrl = userState.avatarUrl;
      this.nickName = userState.nickname;
      this.signature = userState.signature;
      this.backgroundUrl = userState.backgroundUrl;
      this.userId = userState.userId;
    });
  },
  // 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
  onShow() {
    // 歌单数量
    getPlaylistCount().then((response) => {
      let playLists = response.data;
      // 创建歌单数量
      this.createdPlaylistCount =
        "创建歌单" + "(" + playLists.createdPlaylistCount + "个)";
      // 收藏歌单数量
      this.subPlaylistCount =
        "收藏歌单" + "(" + playLists.subPlaylistCount + "个)";
    });
    if (this.userId) {
      // 获取用户歌单
      getPlayLists(this.userId).then((response) => {
        let playlist = response.data.playlist;
        // 将列表循环出来
        for (let index = 0; index < playlist.length; index++) {
          const element = playlist[index];
          // 歌单id
          let listId = element.id;
          // 看数组中是否存在相同属性的对象
          let myEnjoyExit = this.eleExit(this.myEnjoy, listId);
          let createdPlaylistExit = this.eleExit(this.createdPlaylist, listId);
          let subPlaylistPlaylistExit = this.eleExit(this.subPlaylist, listId);
          // 通过用户id判断歌单是否为创建歌单
          if (this.userId === element.userId) {
            // 如果存在什么也不做,如果不存在就添加,添加的时候进行判断是我喜欢的歌单还是我创建的歌单
            if (myEnjoyExit) {
            } else if (index === 0) {
              this.myEnjoy.push(element);
            } else if (createdPlaylistExit) {
            } else {
              this.createdPlaylist.push(element);
            }
            console.log("查看是否存在");
            console.log(myEnjoyExit);
          } else if (subPlaylistPlaylistExit) {
          } else {
            // 否则,添加收藏歌单列表
            this.subPlaylist.push(element);
          }
        }
        console.log(this.myEnjoy);
        console.log(this.createdPlaylist);
        console.log(this.subPlaylist);
      });
    }
  },
  methods: {
    // 判断元素是否存在 (数组,歌单id)
    eleExit: function (arr, listId) {
      let result = arr.some((item) => {
        // 判断数组中是否存在歌单id
        if (item.id == listId) {
          return true;
        }
      });
      return result;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  position: relative;

  .avatar {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    margin-top: -40rpx;

    // margin-top: -50rpx;
    .avatar-img {
      width: 100%;
      height: 100%;
      z-index: 100;
    }
  }
}

// 账号名称以及等级
.account {
  text-align: center;
  margin-top: 40rpx;
  margin-bottom: 10rpx;
}

.signature {
  text-align: center;
  margin-bottom: 10rpx;
  font-size: 10px;
}
</style>
