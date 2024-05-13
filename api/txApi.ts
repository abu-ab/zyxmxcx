export const geocoder = async (location) => {
	const response = await uni.request({
		url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${location}&key=JBEBZ-RJBCV-ZEZP2-UN6FT-5QIQ7-BLFJS&poi_options=radius=500;policy=2`
	})
	return response.data;
}

export const getAddress = async (address) => {
	const response = await uni.request({
		url: `https://apis.map.qq.com/ws/geocoder/v1/?address=${address}&key=JBEBZ-RJBCV-ZEZP2-UN6FT-5QIQ7-BLFJS`
	})
	return response.data
}