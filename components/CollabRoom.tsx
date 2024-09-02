"use client"

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense"
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import ActiveCollaborators from "./ActiveCollaborators.tsx"
import { useRef, useState } from "react"
import { Input } from "./ui/input"


const CollabRoom = ({ roomId, roomMetaData }: CollaborativeRoomProps) => {

    const [title, setTitle] = useState(roomMetaData.title)
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const updatetitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
        
    }
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                <div className="collaborative-room">
                    <Header>
                        <div ref={containerRef} className='flex w-fit items-center gap-2 justify-center'>
                            {editing && loading ? (
                                <Input type="text"
                                    value={title}
                                    ref={inputRef}
                                    placeholder="enter title"
                                    onChange={(e) => {
                                        setTitle(e.target.value) 
                                        onkeydown={updatetitle}
                                        disable={!editing}
                                        
                                        className="document-title-input"
                                    }
                                } />
                            ) : <><p className="document-title">{title}</p></>}

                        </div>
                        <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
                            <ActiveCollaborators />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>

    )
}

export default CollabRoom