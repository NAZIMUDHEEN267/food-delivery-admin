
'use client';

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { FaLock } from 'react-icons/fa'
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';

import { resetApi } from '@/queryApis/auth';
import { ResetType } from '@/types/auth';
import CommonInput from '@/components/CommonInput';
import CustomButton from '@/components/CustomButton';
import { resetSchema } from '@/schema/auth';
import { useSearchParams } from 'next/navigation';
import Background from '@/public/images/background.png'
import { useRouter } from 'next/navigation';



export default function Reset() {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const userid = searchParams.get('userid');

    const router = useRouter();

    const { mutate, isPending } = useMutation<any, Error, ResetType>({
        mutationKey: ['reset-password'],
        mutationFn: resetApi,
        onSuccess: (data) => {
            router.replace('/reset/success')
        },
        onError: (err) => toast.error(err.message),
    });

    const { control, formState: { errors }, handleSubmit } = useForm<ResetType>({
        resolver: yupResolver(resetSchema(false))
    });


    const onSubmit = (data: ResetType) => {
        if (!userid || !token) return toast.error('Userid or token is missing')
        mutate({
            passwd: data.passwd,
            token, userid
        })
    }


    return (
        <div className="w-full relative min-h-screen flex items-center justify-center">
            <Image
                src={Background}
                alt="Background"
                className="absolute object-fill top-0 z-0 left-0 h-full w-full"
            />

            <div className="border w-[100%] relative z-10 h-screen flex flex-col justify-center sm:h-auto sm:w-[60%] lg:w-[35%] xl:w-[30%] rounded-xl p-4 shadow-lg bg-white">

                <Image src={'/images/favicon.png'} width={100} height={100} className='sm:hidden self-center mb-2 rounded-full' alt='image.png' draggable={false} />

                <h2 className="text-center text-2xl text-black my-4">{'Reset password'}</h2>

                <CommonInput<ResetType>
                    control={control}
                    name="passwd"
                    style={'mb-2'}
                    error={errors?.passwd?.message || ''}
                    type='password'
                    icon={<FaLock color='orange' />}
                    placeholder="Password"
                />

                <CommonInput<ResetType>
                    control={control}
                    error={errors?.conf_passwd?.message || ''}
                    name="conf_passwd"
                    type='password'
                    icon={<FaLock color='orange' />}
                    placeholder="Confirm password" />



                <CustomButton isLoading={isPending} onClick={handleSubmit(onSubmit)} title={'Submit'} />
            </div>
        </div>
    );
}
