import { http } from "../utils/http"


export const loginApi = (params) => {
	return http.post("/users/login", params)
}