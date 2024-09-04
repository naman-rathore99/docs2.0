import AddDocumentBtn from '@/components/AddDocumentBtn'
import Header from '@/components/Header'
import { getDocs } from '@/lib/actions/room.action'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { metadata } from '../layout'
import Link from 'next/link'
import { dateConverter } from '@/lib/utils'

const Home = async () => {
  const clerkUser = await currentUser()

  if(!clerkUser) redirect('/sign-in')
  const roomDocs = await getDocs(clerkUser.emailAddresses[0].emailAddress)


  return (
    <main className='home-container'>
      <Header className='sticky left-0 top-0'>
        <div className='flex items-center gap-2 lg:gap-4'>
          notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {roomDocs.data.length > 0 ? (
        <div className='document-list-container'>
          <div className="document-list-title">
            <h3 className='text-20-semibold'>
              All documents
            </h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>

          <ul className='document-ul'>
            {roomDocs.data.map(({ id, metadata, createAt }: any) => (
              <li key={id} className='document-list-item'>
                <Link href={`/documents/${id}`} className='flex flex-1 items-center gap-4'>
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <Image src="/assets/icons/doc.svg" alt='files' width={40} height={40} />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">create at {dateConverter(createAt)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='document-list-empty'>
          <Image
            src='/assets/icons/doc.svg'
            alt='document'
            width={80}
            height={80}
            className='mx-auto' />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}


    </main>
  )
}

export default Home