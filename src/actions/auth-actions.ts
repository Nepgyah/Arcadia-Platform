'use server';
import { arcadiaAPI } from '@/lib/api/arcadiaAPI';
import { ActionResult, GraphqlResponse } from '@/types/api';
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

export async function LoginAsAdmin(email: string, password: string) : Promise<ActionResult<any>> {
    const query = `
    mutation($email: String!, $password: String!){
        loginAsAdmin(email: $email, password: $password) {
            access {
                value,
                expiry
            },
            refresh {
                value,
                expiry
            }
        }
    }
    `

    const variables = {
        'email': email,
        'password': password
    }

    try {
        const response = await arcadiaAPI.GraphQL<GraphqlResponse<any>>(query, variables)
        const cookieStore = await cookies()
        cookieStore.set({
            name: 'access_token',
            value: response.data.loginAsAdmin.access.value,
            expires: new Date(response.data.loginAsAdmin.access.expiry)
        })
    
        cookieStore.set({
            name: 'refresh_token',
            value: response.data.loginAsAdmin.refresh.value,
            expires: new Date(response.data.loginAsAdmin.refresh.expiry)
        })
        return {
            success: true,
            data: null
        }
    } catch(error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}