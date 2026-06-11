import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface CSRFResponse {
    token: string
}

interface RefreshResponse {
    data: {
        access : {
            value: string,
            expiry: string
        },
        refresh: {
            value: string,
            expiry: string
        }
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
            console.log('Proxy error on getting csrf token')
            return NextResponse.rewrite(new URL('/service-unavailable', request.url))
        }
    }
}

async function RefreshToken(request: NextRequest, response: NextResponse) {
    const access_token = request.cookies.get('access_token');
    const refresh_token = request.cookies.get('refresh_token');

    if (!access_token && refresh_token) {
        try {
            const refreshResponse = await arcadiaAPI.POST<RefreshResponse>('accounts/tokens/refresh/', {refresh: refresh_token.value});
            response.cookies.set({
                name: 'access_token',
                value: refreshResponse.data.access.value,
                expires: new Date(refreshResponse.data.access.expiry)
            })
    
            response.cookies.set({
                name: 'refresh_token',
                value: refreshResponse.data.refresh.value,
                expires: new Date(refreshResponse.data.refresh.expiry)
            })
    
            request.cookies.set('access_token', refreshResponse.data.access.value)
            request.cookies.set('refresh_token', refreshResponse.data.refresh.value)
        } catch {
            console.log('Proxy error on refreshing tokens')
            return NextResponse.rewrite(new URL('/service-unavailable', request.url))
        }
    }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*png|.*jpg|.*jpeg|.*gif|.*svg|.*webp).*)',
  ],
};