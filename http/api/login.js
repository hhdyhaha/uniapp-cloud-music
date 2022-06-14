// api文件夹,用于集中管理接口
import serviceAxios from "../index";


export const getLoginInfo = (loginInfo) => {
    return serviceAxios({
        url: "/login/cellphone",
        method: "get",
        params: {
			phone:loginInfo.phone,
			password:loginInfo.password
			
        },
    });
};