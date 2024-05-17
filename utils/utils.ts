export const formatTime = (time) => {
	return new Date(time).toLocaleString();
}

export const getStatusText = (status) => {
	if (status === '100') return '待发货';
	else if (status === '200') return '已发货';
	else return '未知状态';
}