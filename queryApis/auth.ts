import customAxios from "@/config/customAxios"
import { ForgotType, LoginSuccessResponse, LoginType, ResetType } from "@/types/auth"


export const loginApi = async (data: LoginType): Promise<LoginSuccessResponse> => {
    return customAxios.post('/login', data)
}

export const forgotApi = (data: ForgotType): Promise<string> => {
    return customAxios.post('/forgot', data)
}

export const resetApi = (data: ResetType ): Promise<string> => {
    return customAxios.post('/reset', data);
}