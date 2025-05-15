'use client';

import CommonInput from '@/components/CommonInput';
import { forgotApi } from '@/queryApis/auth';
import { ForgotType } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaUser } from 'react-icons/fa';
import { FaCircleChevronLeft } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import CustomButton from '@/components/CustomButton';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'



const forgotSchema = yup.object({
    email: yup.string().email('Field must be email').required('Email is required'),
    role: yup.string().nullable().default('admin')
})

function ForgotPage() {

    const router = useRouter();


    const { mutate, isPending } = useMutation<string, string, ForgotType>({
        mutationKey: ['forgot-password'],
        mutationFn: forgotApi,
        onSuccess: (msg) => toast.success('Reset link successfully send.'),
        onError: (err) => toast.error(err),
    });

    const { control, formState: { errors }, handleSubmit, reset } = useForm<ForgotType>({
        resolver: yupResolver(forgotSchema)
    });




    return (
        <div>
            <button onClick={router.back} className='absolute top-4 sm:relative mb-12'>
                <FaCircleChevronLeft color='orange' className='text-3xl sm:text-2xl' />
            </button>

            <CommonInput
                control={control}
                error={typeof errors?.email?.message === 'string' ? errors?.email?.message : undefined}
                name="email"
                style={'mb-2'}
                icon={<FaUser color='orange' />}
                placeholder="Email"
            />

            <CustomButton isLoading={isPending} onClick={handleSubmit(mutate)} title={'Submit'} />
        </div>
    )
}

export default ForgotPage