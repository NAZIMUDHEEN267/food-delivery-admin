import * as yup from 'yup'

export const loginSchema = yup.object({
    email: yup.string().email('Field must be email').required('Email is required'),
    password: yup.string().required('Password is required')
})

export const forgotSchema = yup.object({
    email: yup.string().email('Field must be email').required('Email is required')
})

export const resetSchema = (server: boolean) => yup.object({
    passwd: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    conf_passwd: server ? yup.string().nullable() : yup.string().oneOf([yup.ref('passwd')], 'Password must match').required('Confirm password is required'),
    ...(server && ({
        token: yup.string().required('Token required').typeError('Token required'),
        userid: yup.string().required('User id is required')
    }))
})
