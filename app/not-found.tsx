'use client';

import CustomButton from "@/components/CustomButton"
import Image from "next/image"
import { useRouter } from "next/navigation"

function ErrorPage() {

  const router = useRouter();

  const onClick = () => {
    router.push('/')
  }

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-white">
      <Image src='/images/not-found.jpg' width={300} height={300} alt="not-found.png" />
      <div className="w-[300px]">
        <CustomButton title="Back to home" onClick={onClick} />
      </div>
    </div>
  )
}

export default ErrorPage