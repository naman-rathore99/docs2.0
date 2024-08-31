import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <main className='home-container'>
      <Header className='sticky top-0 left-0'>
        <div className='flex items-center gap-2 lg:gap-4'>
          notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
    </main>
  )
}

export default Home