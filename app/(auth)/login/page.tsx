
'use client';

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { FaUser, FaLock } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { loginApi } from '@/queryApis/auth';
import { LoginSuccessResponse, LoginType } from '@/types/auth';
import CommonInput from '@/components/CommonInput';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/navigation';
import * as yup from 'yup'



const loginSchema = yup.object({
  email: yup.string().email('Field must be email').required('Email is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().default('admin')
})



export default function Login() {

  const router = useRouter();

  const { mutate, isPending } = useMutation<LoginSuccessResponse, string, LoginType>({
    mutationKey: ['login'],
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success('Login successful.')
      localStorage.setItem('user', JSON.stringify(data.user))
      router.replace('/dashboard')
    },
    onError: (err) => toast.error(err)
  });


  const { control, formState: { errors }, handleSubmit, reset } = useForm<LoginType>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = (data: LoginType | { email: string }) => {
    mutate(data as LoginType)
  }


  return (
    <>
      <h2 className="text-center text-2xl text-black my-4">{'Login'}</h2>

      <CommonInput
        control={control}
        error={typeof errors?.email?.message === 'string' ? errors?.email?.message : undefined}
        name="email"
        style={'mb-2'}
        icon={<FaUser color='orange' />}
        placeholder="Email"
      />

      <CommonInput
        control={control}
        error={errors?.password?.message || ''}
        name="password"
        type='password'
        icon={<FaLock color='orange' />}
        placeholder="Password" />

      <p onClick={() => router.push('/forgot')} className='my-2 cursor-pointer bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-orange-400 to-yellow-500 text-right font-medium'>Forgot password?</p>


      <CustomButton isLoading={isPending} onClick={handleSubmit(onSubmit)} title={'Login'} />

    </>
  );
}


