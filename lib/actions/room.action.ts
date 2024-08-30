import {nanoid} from "nanoid"

export const createDocument = async ({ userId, email }: { CreateDocumentParams }) => {
    const roomId = nanoid();


    try {
        const metadata = {
            createId: userId,
            
        }
    } catch (error) {
        console.log(`error happen while creating room ${error}`)
    }
}