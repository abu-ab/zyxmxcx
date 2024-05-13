import { http } from "../utils/http"

export const addPath = (params) => {
	return http.post("/orderPath/add", params)
}

export const deletePath = (id) => {
	return http.delete("/orderPath/" + id)
}

export const pathList = (id) => {
	return http.put("/orderPath/list/" + id)
}