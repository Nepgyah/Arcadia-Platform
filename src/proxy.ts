import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface CSRFResponse {
    token: string
}

export async function proxy(request: NextRequest) {
    const response = NextResponse.next()
    const csrfToken = request.cookies.get('csrfToken')
    if (!csrfToken) {
        const apiResponse = await arcadiaAPI.GET<CSRFResponse>('util/csrf/')
        response.cookies.set('csrfToken', apiResponse.token)
    }
    return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}