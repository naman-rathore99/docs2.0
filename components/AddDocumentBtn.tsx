"use client"

import { createDocument } from '@/lib/actions/room.action';
import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
    const router = useRouter()
    const addDocHandler = async () => {
        try {
            const room = await createDocument({ userId, email })
            if (room) router.push(`/documents/${room.id}`);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button type='submit' onClick={addDocHandler} className='gradient-blue gap-1 flex shadow-md'>
            <Image src="/assets/icons/add.svg" alt='add' width={10} height={10} />
            <p className='hidden sm:block'>Start a black document</p>
        </Button>
    )
}

export default AddDocumentBtn