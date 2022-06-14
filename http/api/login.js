// api文件夹,用于集中管理接口
import serviceAxios from "../index";


export const getLoginInfo = (liginInfo) => {
	console.log('登录的信息')
	console.log(liginInfo)
    return serviceAxios({
        url: "/login/cellphone",
        method: "get",
        params: {
        
        },
    });
};