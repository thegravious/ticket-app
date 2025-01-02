import React from 'react'
import Link from 'next/link'


const header = () => {
  return (
    <div>
        <nav className="bg-white">
         <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link href="/" className="text-black text-xl font-bold">BOOKING</Link>
        <Link href="/your-ticket" className="text-black text-xl font-bold ml-10">YOUR SEAT</Link>
    </div>
</nav>
    </div>
  )
}

export default header