"use client"


import { nanoid } from "nanoid"
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
    const roomId = nanoid();


    try {
        const metadata = {
            createId: userId,
            email,
            title: "Untitle"

        }

        const usersAccesses: RoomAccesses = {
            [email]: ["room:write"]
        }



        const room = await liveblocks.createRoom(roomId, {
            metadata, usersAccesses, defaultAccesses: []
        });

        revalidatePath('/');
        return parseStringify(room)

    } catch (error) {
        console.log(`error happen while creating room ${error}`)
    }
}