import { http } from "../utils/http"

export const addressList = (params) => {
	return http.get(`/address/list`, params)
}

export const createAddress = (params) => {
	return http.post("/address/create", params)
}

export const updateAddress = (params) => {
	return http.post("/address/update", params)
}

export const addressDetail = (id) => {
	return http.get(`/address/${id}`)
}

export const deleteAddress = (id) => {
	return http.delete(`/address/delete/${id}`)
}