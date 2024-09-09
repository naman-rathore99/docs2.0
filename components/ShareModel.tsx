"use client"

import { useSelf } from '@liveblocks/react/suspense'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import Image from 'next/image'
import { Label } from './ui/label'
import { Input } from './ui/input'
import UserTypeSelector from './UserTypeSelector'
import Collaborator from './Collaborator'
import { updateDocumentAccess } from '@/lib/actions/room.action'



const ShareModel = ({ roomId, creatorId, currentUserType, collaborators }: ShareDocumentDialogProps) => {
    const user = useSelf();



    const [open, setopen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const [userType, setuserType] = useState('viewer')
    const shareHandler = async () => {

        setLoading(true);
        await updateDocumentAccess({
            roomId,
            email,
            userType: type as UserType,
            updatedBy: user
        })
        setLoading(false);

    }
    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger>
                <Button className='gradient-blue flex gap-1 px-4 ' disabled={currentUserType !== "editor"}>
                    <Image src="/assets/icons/share.svg"
                        alt='share'
                        width={20}
                        height={20}
                        className='min-w-4 md:size-5'
                    />
                    <p className='mr-1 hidden sm:block'>Share</p>
                </Button>

            </DialogTrigger>
            <DialogContent className='shad-dialog'>
                <DialogHeader>
                    <DialogTitle>Manage who can can view this project</DialogTitle>
                    <DialogDescription>
                        Select which user can edit this document
                    </DialogDescription>
                    <Label htmlFor="email" className="mt-6 text-blue-600">
                        Email Addreess
                    </Label>
                    <div className="flex item-center gap-3">

                        <div className="flex flex-1 rounded-md bg-dark-400">

                            <Input id="email"
                                placeholder="Enter the email address"
                                value={email}
                                onOpenChange={(e) => setEmail(e.target.value)}
                                className="share-input"
                            />
                            <UserTypeSelector

                                userType={userType}
                                setUserType={setuserType}
                            />

                        </div>
                        <Button
                            type="submit"
                            onClick={shareHandler}
                            className='gradient-blue flex h-full gap-1 px-5' disabled={loading}>

                            {loading ? "sending ... " : "invite"}

                        </Button>
                    </div>
                    <div className="my-2 space-y-2">
                        <ul className="flex flex-col">
                            <Collaborator
                                key={Collaborator.Id}
                                roomId={roomId}
                                creatorId={creatorId}
                                email={Collaborator.email}
                                collaborator={collaborators}
                                user={user.info}


                            />
                        </ul>
                    </div>

                </DialogHeader>
            </DialogContent>
        </Dialog>


    )
}

export default ShareModel