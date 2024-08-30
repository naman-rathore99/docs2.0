"use client"

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense"
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
const CollabRoom = () => {
    return (
        <RoomProvider id="my-room">
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                <div className="collaborative-room">
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
            </ClientSideSuspense>
        </RoomProvider>

    )
}

export default CollabRoom