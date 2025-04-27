import Image from "next/image";
import Success from '@/public/images/success.png'

export default function SuccessPage() {

    return (
        <div className="w-full min-h-screen flex flex-col relative bg-white items-center justify-center">
            <Image src={Success} width={100} height={100} className='self-center mb-8 rounded-full' alt='image.png' draggable={false} />

            <h2 className="text-xl text-gray-800 mb-2 font-bold">Password updated!</h2>
            <p className="text-md text-gray-500 text-center">Your password has been changed successfully, <br /> use your new password to log in.</p>
        </div>
    );
}
