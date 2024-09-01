"use server";

import { clerkClient } from "@clerk/nextjs/server";


export const getClerkUser = async ({ userIds }: { userIds: string[] }) => {
    try {

        const { data } = await clerkClient.users.getUserList({ emailAddress: userIds })


        const users = data.map((user) => {
            id: user.id;
            name: `${user.firstName} ${user.lastName}.`;
            email: user.emailAddresses[0].emailAddress;
            avatar: user.imageUrl
        })

        const sortedUsers = userIds.map((email) => userIds.find((user) => user.email === email))
    } catch (error) {
        console.log(`error while fecthing user ${error}`);

    }
}