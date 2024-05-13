import { http } from "../utils/http"


export const getQRCode = (id) => {
	return http.get(`/qrcode/${id}`)
}