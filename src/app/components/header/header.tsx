import React from 'react'
import Link from 'next/link'


const header = () => {
  return (
    <div>
        <nav className="bg-red-600">
         <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link href="/" className="text-white">BOOKING</Link>
        <Link href="/your-ticket" className="text-white ml-10">YOUR SEAT</Link>
    </div>
</nav>
    </div>
  )
}

export default header