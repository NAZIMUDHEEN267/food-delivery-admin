
// 'use client';

// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm } from 'react-hook-form';
// import { FaUser, FaLock } from 'react-icons/fa'
// import { toast } from 'react-toastify';
// import Image from 'next/image';
// import { useMutation } from '@tanstack/react-query';

// import { ResetType } from '@/types/auth';
// import CommonInput from '@/components/CommonInput';
// import CustomButton from '@/components/CustomButton';
// import { useSearchParams } from 'next/navigation';
// import customAxios from '@/config/customAxios';
// import { useEffect } from 'react';
// import { useUser } from '@/context/UserContext';
// import { logoutApi } from '@/queryApis/auth';


export default function Dashboard() {

    return <div>
        hello
    </div>

    const searchParams = useSearchParams();
    const user = useUser()

    // logoutApi()

    const { mutate } = useMutation<any, Error, ResetType>({
        mutationKey: ['reset-password'],
        // mutationFn: resetApi,
        onSuccess: (data) => {
            toast.success('Password successfully changed.')
        },
        onError: (err: Error) => toast.error(err.message),
    });
    

    const { control, formState: { errors }, handleSubmit } = useForm<ResetType>({
        // resolver: yupResolver(resetSchema)
    });


    return (
        <div className="w-full min-h-screen bg-[url('/images/background.png')] bg-[length:100%_100%] flex items-center justify-center bg-no-repeat bg-top-left">
            <div className="border w-[100%] h-screen flex flex-col justify-center sm:h-auto sm:w-[60%] lg:w-[35%] xl:w-[30%] rounded-xl p-4 shadow-lg bg-white">

                <Image src={'/images/favicon.png'} width={100} height={100} className='sm:hidden self-center mb-2 rounded-full' alt='image.png' draggable={false} />

                <h2 className="text-center text-2xl text-black my-4">{'Dashboard password'}</h2>

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



                {/* <CustomButton isLoading={} onClick={handleSubmit(mutate)} title={'Submit'} /> */}
            </div>
        </div>
    );
}
