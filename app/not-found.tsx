"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFound = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
    <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
      404 - Page Not Found
    </h1>
    <p className="mt-3 max-w-xl text-center text-light-400">
      The page you&apos;re looking for doesn&apos;t exist. Please check the URL and try again.
    </p>
    <Link href="/" className="mt-5">
      <Button variant="default">Return to Home</Button>
    </Link>
  </main>
  )
}

export default NotFound