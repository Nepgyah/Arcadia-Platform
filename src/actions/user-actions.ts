'use server'

import { User } from "@/types/user"
import { arcadiaAPI } from "@/lib/api/arcadiaAPI"
import { RESTResponse } from "@/types/api"
import { cookies } from "next/headers"

interface FetchUserResponse extends RESTResponse<User> {
    user: User
}

export async function FetchUser() {
    const cookieStore = await cookies()
    const access_token = cookieStore.get('access_token')

    if (access_token) {
        const response = await arcadiaAPI.GET<FetchUserResponse>('user/')
        return response.user
    }
    return null;
}

export async function LogoutUser() {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
}