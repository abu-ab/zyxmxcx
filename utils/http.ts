const BASE_URL = 'http://139.9.198.139:8081'; // 设置基础 URL

export const http = {
	async get(url : string, params ?: any) {
		return await request(getFullUrl(url), 'GET', params);
	},

	async post(url : string, data ?: any) {
		return await request(getFullUrl(url), 'POST', data);
	},

	async put(url : string, data ?: any) {
		return await request(getFullUrl(url), 'PUT', data);
	},

	async delete(url : string, params ?: any) {
		return await request(getFullUrl(url), 'DELETE', params);
	}
}

function getFullUrl(url : string) {
	return `${BASE_URL}${url}`;
}

async function request(url : string, method : string, data ?: any) {

	const response = await uni.request({
		url,
		method,
		data
	});
	console.log(response)
	return response.data;
}