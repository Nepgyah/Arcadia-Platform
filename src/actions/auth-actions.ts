'use server';
import { arcadiaAPI } from '@/utils/api/arcadiaAPI';
import { cookies } from 'next/headers'

interface LoginAsAdminResponse {
    refresh_token: {
        value: string,
        expiry: string
    },
    access_token: {
        value: string,
        expiry: string
    },
    message: string
}

export async function LoginAsAdmin(username: string, password: string) : Promise<string> {
    const response = await arcadiaAPI.POST<LoginAsAdminResponse>(
        'auth/admin-login/',
        {
            username: username,
            password: password
        }
    )

    const cookieStore = await cookies()
    
    cookieStore.set({
        name: 'access_token',
        value: response.access_token.value,
        expires: new Date(response.access_token.expiry)
    })

    cookieStore.set({
        name: 'refresh_token',
        value: response.refresh_token.value,
        expires: new Date(response.refresh_token.expiry)
    })

    return response.message
}