'use server';

import { nanoid } from 'nanoid'
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { getAccessType, parseStringify } from '../utils';
import { redirect } from 'next/navigation';

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled'
    }

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ['room:write']
    });

    revalidatePath('/');

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
}


export const getDoc = async ({ userId, roomId }: { userId: string, roomId: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId)

    //  const hasAccess=Object.keys(room.usersAccesses).includes(userId)

    //  if(!hasAccess){throw new Error("you have no access to this room")}

    return parseStringify(room);
  } catch (error) {
    console.log(`error happend while creating room ${error}`);

  }
}



export const updateDoc = async (roomId: string, title: string) => {
  try {
    const updateRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title
      }
    })

    revalidatePath(`/documents/${roomId}`)

    return parseStringify(updateRoom)


  } catch (error) {
    console.log(`error happend while updating title ${error}`);
  }
}


export const getDocs = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email })

    return parseStringify(rooms);
  } catch (error) {
    console.log(`error happend while fetching rooms ${error}`);

  }
}
