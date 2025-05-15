'use client';

import { useCallback, useState } from 'react'
import { Control, useController, FieldValues } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";



interface Props<T extends FieldValues> {
    name: string
    icon: React.ReactNode
    control: Control<T>
    error?: string
    placeholder: string
    style?: string
    type?: string
    disabled?: boolean
}

export default function CommonInput<T extends FieldValues>({ control, name, icon, error, type, disabled, style, placeholder }: Props<T>) {

    const [hide, setHide] = useState(false);

    const handleHide = useCallback(() => {
        setHide(!hide);
    }, [hide])

    const { field } = useController({
        name: name as any,
        control,
    })

    return (
        <>
            <div className={`p-2 rounded-xl border  group focus-within:shadow-orange-glow transition-shadow flex items-center justify-between gap-2 ${disabled && 'bg-gray-100'} ${style}`} 
            >
                <div className="p-2">
                    {icon}
                </div>
                <input
                    {...field}
                    disabled={disabled}
                    className='text-gray-500 px-2 flex-grow py-2 focus:outline-none'
                    type={(type === 'password' && hide) ? 'text' : type}
                    placeholder={placeholder}
                />

                {type === 'password' && (
                    <div className="p-2 text-gray-400 text-xl" onClick={handleHide}>
                        {hide ? <IoMdEye /> : <IoMdEyeOff />}
                    </div>
                )}
            </div>

            {error && <p className='mb-2 text-red-400 text-sm mt-2'>{error}</p>}

        </>
    )
}