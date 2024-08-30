import { SignedOut } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='auth-page'>
      <SignedOut />
    </main>
  )
}

export default SignUpPage