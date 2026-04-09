'use server';

import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { cookies } from "next/headers";

interface CSRFResponse {
    token: string
}
export async function FetchCSRFToken() {
    const response = await arcadiaAPI.GET<CSRFResponse>('util/csrf/')

    const cookieStore = await cookies()

    cookieStore.set({
        name: 'csrftoken',
        value: response.token
    })
}