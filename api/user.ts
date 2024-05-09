import { http } from "../utils/http"


export const loginApi = (params) => {
	return http.post("/users/login", params)
}


export const registerApi = (params) => {
	return http.post("/users/register", params)
}