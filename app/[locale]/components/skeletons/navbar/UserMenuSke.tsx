import React from 'react'

type Props = {}

const UserMenuSke = (props: Props) => {
  return (
    <div className="relative">
      <div className='w-[30px] h-[25px] fixed top-0 right-1 xl:top-1 xl:right-3 animate-pulse bg-gray-300 border rounded-md'></div>
      <div className="flex flex-row items-center sm:gap-3 animate-pulse ">
        <div className='flex flex-row items-center w-[40px] h-[40px] gap-4 animate-pulse bg-gray-300 border rounded-full'></div>
        <div className='flex flex-row items-center w-[40px] h-[40px] gap-4 animate-pulse bg-gray-300 border rounded-full'></div>
        <div className='flex flex-row items-center w-[50px] h-[50px] gap-4 animate-pulse bg-gray-300 border rounded-full'></div>
      </div>
    </div>
  )
}

export default UserMenuSke