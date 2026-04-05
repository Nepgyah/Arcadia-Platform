'use client';

import { Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid'
import { permanentRedirect} from "next/navigation";
import { setOauthState } from "@/utils/actions/oauth";
import { useRouter } from "next/navigation";

export default function Page() {
    const redirect_url = `${process.env.NEXT_PUBLIC_ARCADIA_WEBSITE_URL}auth/callback`
    const router = useRouter()

    const handleRedirect = () => {
        const state = uuidv4();
        setOauthState(state)
        const url = `${process.env.NEXT_PUBLIC_D2X_WEBSITE_URL}oauth/authorize?client_id=arcadia-client&redirect=${redirect_url}&state=${state}`;
        permanentRedirect(url)
    }

    const handleAdminRedirect = () => {
        router.push('auth/admin/login')
    }

    return (
        <div id="page-auth-login" className="page-content">
            <div>
                <Button onClick={handleRedirect} variant={'solid'}>
                    Sign Into Your D2X Account to use Arcadia Today!
                </Button>
            </div>

            <div>
                <Button onClick={handleAdminRedirect} variant={'ghost'}>
                    Login As Admin
                </Button>
            </div>
        </div>
    )
}