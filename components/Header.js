import React from 'react'
import Image from 'next/image'
//import { UserButton } from '@clerk/clerk-react'
import { UserButton } from '@clerk/nextjs';
function Header() {
  const headermenu= [
    {
    id:1,
    name:'Ride',
    icon:'/car.jpg'
  },
  {
    id:2,
    name:'Package',
    icon:'/box.jpg'
  }

]

  return (
    <div className='p-4 pb-0 pl-0 border-b-[4px] border-gray-200 flex items-center justify-between ' >
      <div className='flex gap-24 items-center'>
        <Image src= '/logo.jpg' width={70} height={70} alt="logo"/> 
        <div className='flex -gap-6 items-center'>
          {headermenu.map((item)=>(
            <div key={item.id} className='flex gap-2 items-center mt-4'>
            <Image src={item.icon} width={17} height={17} className='mt-0.5' alt={item.name} />
            <h2 className='text-[16px] pr-8 font-medium'>{item.name}</h2>
          </div>
          ))}
        </div>
      </div>
      <UserButton/>
    </div>
  )
}

export default Header