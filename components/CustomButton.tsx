'use client';

interface Props {
    title: string;
    isLoading?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function CustomButton({ title, onClick, isLoading }: Props) {
    return (
        <button disabled={isLoading} className="rounded-xl bg-amber-500 w-full p-2 font-bold mt-4 cursor-pointer hover:bg-amber-400" onClick={onClick}>
            {
                isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin-slow" />
                    </div>
                ) :
                    title}
        </button>
    )
}