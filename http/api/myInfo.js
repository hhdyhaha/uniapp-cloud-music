// api文件夹,用于集中管理接口
import serviceAxios from "../index";


export const getMyInfo = () => {
    return serviceAxios({
        url: "/login/status",
        method: "get",
    });
};