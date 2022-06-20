// api文件夹,用于集中管理接口
import serviceAxios from "../index";

// 账户信息
export const getMyInfo = () => {
    return serviceAxios({
        url: "/login/status",
        method: "get",
    });
};
// 创建歌单数量
export const getPlaylistCount = () => {
    return serviceAxios({
        url: "/user/subcount",
        method: "get",
    });
};

// 获取用户歌单
export const getPlayLists = (uid) => {
    return serviceAxios({
        url: "/user/playlist",
        method: "get",
		params:{
			uid:uid
		}
    });
};

// 获取歌单所有歌曲
export const getPlayListsDetail = (id) => {
	console.log('传过来的歌单id')
	console.log(id)
    return serviceAxios({
        url: "/playlist/track/all",
        method: "get",
		params:{
			id:id,
			limit:30
		}
    });
};