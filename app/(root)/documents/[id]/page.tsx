
import CollabRoom from '@/components/CollabRoom'
import { getDoc } from '@/lib/actions/room.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Document = async ({ params: { id } }: SearchParamProps) => {
    const clerkUser = await currentUser()
    if (!clerkUser) redirect("/sign-in")


    const room = await getDoc({ roomId: id, userId: clerkUser.emailAddresses[0].emailAddress })

    if (!room) redirect('/')
    return (

        <div className='flex w-full flex-col items-center'>
            <CollabRoom
                roomId={id}
                roomMetaData={room.metadata}
            />
        </div>
    )
}

export default Document