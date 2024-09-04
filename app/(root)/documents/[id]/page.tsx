
import CollabRoom from '@/components/CollabRoom'
import { getDoc } from '@/lib/actions/room.action'
import { getClerkUsers } from '@/types/user.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Document = async ({ params: { id } }: SearchParamProps) => {
    const clerkUser = await currentUser()
    if (!clerkUser) redirect("/sign-in")


    const room = await getDoc({ roomId: id, userId: clerkUser.emailAddresses[0].emailAddress })

    if (!room) redirect('/')

    const userIds = Object.keys(room.usersAccesses);

    const users = await getClerkUsers({ userIds })
    const userData = users.map((user: User) => ({
        ...user,
        userType: room.usersAccesses[user.email]?.includes('room:write')
            ? 'editor'
            : 'viewer'
    }))

    const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';
    return (

        <div className='flex w-full flex-col items-center'>
            <CollabRoom
                roomId={id}
                users={userData}
                currentUserType={currentUserType}
                roomMetaData={room.metadata}
            />
        </div>
    )
}

export default Document