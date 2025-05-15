import customAxios from "@/config/customAxios"
import { ForgotType, LoginSuccessResponse, LoginType } from "@/types/auth"


export const loginApi = async (data: LoginType): Promise<LoginSuccessResponse> => {
    return customAxios.post('/auth/sign-in', data)
}

export const forgotApi = (data: ForgotType): Promise<string> => {
    return customAxios.post('/auth/forgot-password', data)
}


export const logoutApi = (): Promise<string> => {
    return customAxios.get('/auth/logout')
}
