"use client"

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense"
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import ActiveCollaborators from "./ActiveCollaborators.tsx"
import { useEffect, useRef, useState } from "react"
import { Input } from "./ui/input"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image.js"
import { updateDoc } from "@/lib/actions/room.action"
import Loader from "./Loader"


const CollabRoom = ({ roomId, roomMetaData, users, currentUserType }: CollaborativeRoomProps) => {




    const [title, setTitle] = useState(roomMetaData.title)
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [editing])

    useEffect(() => {
        const handelClickOutSide = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setEditing(false)
                updateDoc(roomId, title)
            }
        }
        document.addEventListener('mousedown', handelClickOutSide)
        return () => {
            document.removeEventListener('mousedown', handelClickOutSide)
        }
    }, [roomId, title])


    const updatetitle = async (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            setLoading(true)

            try {
                if (title !== roomMetaData.title) {
                    const updateDocumene = await updateDoc(roomId, title)
                }
            }
            catch (error) {
                console.log(error)
            }
            setLoading(false)
        }


    }
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader />}>
                <div className="collaborative-room">
                    <Header>
                        <div ref={containerRef} className='flex w-fit items-center justify-center gap-2'>
                            {editing && !loading ? (
                                <Input type="text"
                                    value={title}
                                    ref={inputRef}
                                    placeholder="enter title"
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    onKeyDown={updatetitle}
                                    disabled={!editing}
                                    className="document-title-input"
                                />

                            ) : <><p className="document-title">{title}</p></>}

                            {currentUserType === "editor" && !editing && (
                                <Image
                                    src="/assets/icons/edit.svg"
                                    alt="edit"
                                    width={24}
                                    height={24}
                                    className="pointer"

                                    onClick={() => setEditing(true)}
                                />
                            )}


                            {currentUserType !== "editor" && !editing && (
                                <p className="view-only-tag">view only</p>
                            )}

                            {loading && <p className="text-sm text-gray-400 ">saving...</p>}

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
                    <Editor currentUserType={currentUserType} roomId={roomId} />
                </div>
            </ClientSideSuspense>
        </RoomProvider>

    )
}

export default CollabRoom