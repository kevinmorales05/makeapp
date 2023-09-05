import React from 'react'

type Props = {}

const UserMenuSke = (props: Props) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center sm:gap-3 animate-pulse ">
        <div className='flex flex-row items-center w-[40px] h-[40px] gap-4 animate-pulse bg-gray-300 border rounded-full'></div>
        <div className='flex flex-row items-center w-[40px] h-[40px] gap-4 animate-pulse bg-gray-300 border rounded-full'></div>
        <div className='flex flex-row items-center w-[50px] h-[50px] gap-4 animate-pulse bg-gray-300 border rounded-full'></div>
      </div>
    </div>
  )
}

export default UserMenuSke