import { http } from "../utils/http"


export const getRegionList = () => {
	return http.get('/region.JSON')
}

export const getUrl = async (id) => {
	const response = await uni.request({
		url: `https://139.9.198.139:8888/download?filename=/www/wwwroot/default/images/qrcode/${id}.png`,
		method: "GET",
		data: {}
	});
	console.log(response)
	return response.data;
}