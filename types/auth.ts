
export type LoginType = {
    email: string;
    password: string;
}

export type ForgotType = {
    email: string;
}

export type LoginSuccessResponse = {
    token: string;
    user: {
        name: string;
        email: string;
        image: string;
        role: 'admin' | 'super-admin';
    }
}

export type ResetType = {
    conf_passwd?: string;
    passwd: string;
    token: string;
    userid: string
}
