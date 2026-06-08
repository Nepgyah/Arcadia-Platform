'use server';
import { arcadiaAPI } from '@/lib/api/arcadiaAPI';
import { cookies } from 'next/headers'

interface LoginAsAdminResponse {
    data: {
        refresh: {
            value: string,
            expiry: string
        },
        access: {
            value: string,
            expiry: string
        },
    }
    message: string
}

export async function LoginAsAdmin(email: string, password: string) : Promise<any> {
    try {
        const response = await arcadiaAPI.POST<LoginAsAdminResponse>(
            'accounts/admin/login/',
            {
                email: email,
                password: password
            }
        )

        const cookieStore = await cookies()
        console.log(response)
        cookieStore.set({
            name: 'access_token',
            value: response.data.access.value,
            expires: new Date(response.data.access.expiry)
        })

        cookieStore.set({
            name: 'refresh_token',
            value: response.data.refresh.value,
            expires: new Date(response.data.refresh.expiry)
        })

        return response.message
    } catch(e: any) {
        console.log(e)
        throw "Invalid credentials"
    }
}