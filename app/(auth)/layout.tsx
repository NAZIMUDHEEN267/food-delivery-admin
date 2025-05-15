import Image from 'next/image'
import React, { ReactNode } from 'react'
import Background from '@/public/images/background.png'


type Props = {
    children: ReactNode
}

function layout({ children }: Props) {
    return (
        <div className="w-full relative min-h-screen flex items-center justify-center">

            <Image
                src={Background}
                alt="Background"
                className="absolute object-fill top-0 z-0 left-0 h-full w-full"
            />

            <div className="border w-[100%] relative z-10 h-screen flex flex-col justify-center sm:h-auto sm:w-[60%] lg:w-[35%] xl:w-[30%] rounded-xl p-4 shadow-lg bg-white">
                <Image src={'/images/favicon.png'} width={100} height={100} className='sm:hidden self-center mb-2 rounded-full' alt='image.png' draggable={false} />
                {children}
            </div>
        </div >
    )
}
export default layout