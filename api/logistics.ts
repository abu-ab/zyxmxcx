import { http } from "../utils/http"

export const createLogistics = (params) => {
	return http.post('/logistics/create', params)
}

export const logisticsList = (params) => {
	return http.put('/logistics/list', params)
}

export const logistDetail = (id) => {
	return http.get(`/logistics/${id}`)
}

export const updateLogist = (params) => {
	return http.put("/logistics/update", params)
}

export const deleteLogist = (id) => {
	return http.delete(`/logistics/${id}`)
}

export const confirmOrderStatus = (id) => {
	return http.get(`/logistics/confirm/${id}`)
}