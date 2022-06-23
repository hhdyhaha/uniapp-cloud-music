import serverConfig from "./config/index";
export const request = (options = {}) => {
	return new Promise((resolve, rejects) => {
		handleRequest(options, resolve, rejects)
	})
}
// 发起请求
function handleRequest(options, resolve, reject) {
	uni.request({
		url: serverConfig.baseURL + options.url,
		method: options.method,
		data: options.params,
		success: (response) => {
			return resolve(response)
		},
		fail: (fail) => {
			console.log('fail', fail)
			return reject(fail);
		}
	})
}
