
'use client';

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { FaUser, FaLock } from 'react-icons/fa'
import { useCallback, useState } from 'react';
import { FaCircleChevronLeft } from "react-icons/fa6";
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';

import { forgotApi, loginApi } from '@/queryApis/auth';
import { ForgotType, LoginSuccessResponse, LoginType } from '@/types/auth';
import CommonInput from '@/components/CommonInput';
import CustomButton from '@/components/CustomButton';
import { forgotSchema, loginSchema } from '@/schema/auth';
import Background from '@/public/images/background.png'


export default function Login() {

  const [forgot, setForgot] = useState(false);

  const { mutate, isPending  } = useMutation<LoginSuccessResponse, Error, LoginType>({
    mutationKey: ['login'],
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log({ data });
      toast.success('Login successful.')
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: forgMutate, isPending: loading } = useMutation<string, Error, ForgotType>({
    mutationKey: ['forgot-password'],
    mutationFn: forgotApi,
    onSuccess: () => toast.success('Password reset sent'),
    onError: (err) => toast.error(err.message),
  });


  const { control, formState: { errors }, handleSubmit, reset } = useForm<LoginType>({
    resolver: yupResolver(forgot ? forgotSchema : loginSchema)
  });


  const onSubmit = (data: LoginType | { email: string }) => {
    if (forgot) {
      forgMutate(data)
    } else {
      mutate(data as LoginType)
    }
  }


  const handleForgot = useCallback(() => {
    setForgot(!forgot)
    reset({ email: '', password: '' })
  }, [forgot])


  return (
    <div className="w-full relative min-h-screen flex items-center justify-center">

      <Image
        src={Background}
        alt="Background"
        className="absolute object-fill top-0 z-0 left-0 h-full w-full"
      />

      <div className="border w-[100%] relative z-10 h-screen flex flex-col justify-center sm:h-auto sm:w-[60%] lg:w-[35%] xl:w-[30%] rounded-xl p-4 shadow-lg bg-white">

        {
          forgot && (
            <button onClick={handleForgot} className='absolute top-4 sm:relative'>
              <FaCircleChevronLeft color='orange' className='text-3xl sm:text-2xl' />
            </button>
          )
        }

        <Image src={'/images/favicon.png'} width={100} height={100} className='sm:hidden self-center mb-2 rounded-full' alt='image.png' draggable={false} />

        <h2 className="text-center text-2xl text-black my-4">{forgot ? 'Forgot Password' : 'Login'}</h2>

        <CommonInput<LoginType>
          control={control}
          error={typeof errors?.email?.message === 'string' ? errors?.email?.message : undefined}
          name="email"
          style={'mb-2'}
          icon={<FaUser color='orange' />}
          placeholder="Email"
        />

        {
          !forgot && (
            <>
              <CommonInput<LoginType>
                control={control}
                error={errors?.password?.message || ''}
                name="password"
                type='password'
                icon={<FaLock color='orange' />}
                placeholder="Password" />

              <p onClick={handleForgot} className='my-2 cursor-pointer bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-orange-400 to-yellow-500 text-right font-medium'>Forgot password?</p>
            </>
          )
        }


        <CustomButton isLoading={isPending || loading} onClick={handleSubmit(onSubmit)} title={forgot ? 'Submit' : 'Login'} />
      </div>
    </div>
  );
}


