import { http } from "../utils/http"


export const getRegionList = () => {
	return http.get('/region/list')
}