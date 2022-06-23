// api文件夹,用于集中管理接口
import {
	request
} from "../index1";


export const getLoginInfo1 = (loginInfo) => {
	console.log('获取到的数据', loginInfo)
	return request({

		url: "/login/cellphone",
		method: "get",
		params: {
			phone: loginInfo.phone,
			password: loginInfo.password

		},
	});
};
