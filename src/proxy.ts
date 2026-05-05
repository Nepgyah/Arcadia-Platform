import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface CSRFResponse {
    token: string
}

interface RefreshResponse {
    access_token : {
        value: string,
        expiry: string
    },
    refresh_token: {
        value: string,
        expiry: string
    }
}

export async function proxy(request: NextRequest) {
    const response = NextResponse.next();
    await GetCSRFToken(request, response)
    await RefreshToken(request, response)
    
    return response
}

async function GetCSRFToken(request: NextRequest, response: NextResponse) {
    const csrfToken = request.cookies.get('csrfToken');
    if (!csrfToken) {
        try {
            const apiResponse = await arcadiaAPI.GET<CSRFResponse>('util/csrf/');
            response.cookies.set({
                name: 'csrfToken',
                value: apiResponse.token
            });
        } catch {
            console.log('Proxy error')
            return NextResponse.rewrite(new URL('/service-unavailable', request.url))
        }
    }
}

async function RefreshToken(request: NextRequest, response: NextResponse) {
    const access_token = request.cookies.get('access_token');
    const refresh_token = request.cookies.get('refresh_token');

    if (!access_token && refresh_token) {
        try {
            const refreshResponse = await arcadiaAPI.POST<RefreshResponse>('auth/refresh/', {refresh_token: refresh_token.value});
            response.cookies.set({
                name: 'access_token',
                value: refreshResponse.access_token.value,
                expires: new Date(refreshResponse.access_token.expiry)
            })
    
            response.cookies.set({
                name: 'refresh_token',
                value: refreshResponse.refresh_token.value,
                expires: new Date(refreshResponse.refresh_token.expiry)
            })
    
            request.cookies.set('access_token', refreshResponse.access_token.value)
            request.cookies.set('refresh_token', refreshResponse.refresh_token.value)
        } catch {
            console.log('Proxy error')
            return NextResponse.rewrite(new URL('/service-unavailable', request.url))
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}