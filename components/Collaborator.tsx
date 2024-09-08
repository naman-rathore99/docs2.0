import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import UserTypeSelector from './UserTypeSelector'
import { Button } from './ui/button'

const Collaborator = ({ roomId, creatorId, collaborator, email, user }: CollaboratorProps) => {

    const [userType, setUserType] = useState(collaborator.userType || "viewer")

    const [loading, setLading] = useState(false)
    const shareDocumentHandler = async (type: string) => {

    }
    const removeCollboratorHandler = async (type: string) => { }
    return (
        <li className='flex itmes-center justify-between gap-2 py-3'>
            <div className="flex gap-2">

                <Image src={collaborator.avatar}
                    alt={collaborator.name} width={36} height={36} />
            </div>
            <div>
                <p className='line-clamp-1 text-sm font-semibold leading-4 text-white'>
                    {collaborator.name}
                    <span className='text-10-regular pl-2 text-blue-100'> {loading && "updaing..."}</span>
                </p>
                <p className='text-sm font-light text-blue-100'>{collaborator.email}</p>
            </div>
            {creatorId === collaborator.id ? (

                <p className='text-sm text-blue-100 '>owner</p>
            ) : (
                <div className='flex items-center '>
                    <UserTypeSelector userType='userType && userType'

                        setUserType={setUserType || "viewer"}
                        onClickHandler={shareDocumentHandler}
                    />
                    <Button type='button' onClick={() => removeCollboratorHandler(collaborator.email)}>Remove</Button>

                </div>
            )}
        </li>

    )
}

export default Collaborator