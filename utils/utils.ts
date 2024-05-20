export const formatTime = (time) => {
	return new Date(time).toLocaleString();
}

export const getStatusText = (status) => {
	if (status === '100') return '待发货';
	else if (status === '200') return '已发货';
	else if (status === '300') return '已完成'
	else return '未知状态';
}

export const checkRole = (role) => {
	const userInfo = uni.getStorageSync("userInfo")
	console.log(userInfo)
	if (userInfo && userInfo.id) {
		if (typeof role === "string") {
			return userInfo.role == role
		} else {
			console.log(role)
			for (let i = 0; i < role.length; i++) {
				console.log(role[i])
				if (role[i] == userInfo.role) {
					return true
				}
			}
		}
	}
	return false
}

export const roleMap = [
	{ name: '普通用户', value: 'member' },
	{ name: '快递员', value: 'courier' },
	{ name: '管理员', value: 'admin' }
]

export const handleRole = (value) => {
	for (let i = 0; i < roleMap.length; i++) {
		if (roleMap[i].value == value) {
			return roleMap[i].name
		}
	}
	return ""
}