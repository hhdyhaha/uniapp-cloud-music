// api文件夹,用于集中管理接口
import serviceAxios from "../index";

// 获取音乐url
export const getSongUrl = (id) => {
    return serviceAxios({
        url: "/song/url",
        method: "get",
		params:{
			id:id
		}
    });
};