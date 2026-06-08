'use server'

import { User } from "@/types/user"
import { arcadiaAPI } from "@/lib/api/arcadiaAPI"
import { GraphqlResponse } from "@/types/api"
import { cookies } from "next/headers"

interface FetchUserResponse {
    account: {
        profile: User
    }
}

export async function FetchUser() {
    const cookieStore = await cookies()
    const access_token = cookieStore.get('access_token')

    if (access_token) {
        const query = `
        query {
            account {
                profile {
                    id,
                    picturePreset
                }
            }
        }
        `
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<FetchUserResponse>>(query)
        return response.data.account.profile
    }
    return null;
}

export async function LogoutUser() {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
}