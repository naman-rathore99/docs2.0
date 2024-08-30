import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Documnet = () => {
    return (

        <div>
            <Header>
                <div className='flex w-fit items-center gap-2 justify-center'>
                    <p className='document-titile'>untitled </p>
                </div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </Header>
            <Editor />
        </div>
    )
}

export default Documnet 