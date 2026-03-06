'use client';

import { Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid'
import { permanentRedirect} from "next/navigation";
import { oauth } from "@/utils/actions/oauth";

export default function Page() {
    const redirect_url = `${process.env.NEXT_PUBLIC_ARCADIA_WEBSITE_URL}/auth/callback`

    const handleRedirect = () => {
        const state = uuidv4();
        oauth.setOauthState(state)
        const url = `${process.env.NEXT_PUBLIC_D2X_WEBSITE_URL}/oauth/authorize?client_id=arcadia-client&redirect=${redirect_url}&state=${state}`;
        permanentRedirect(url)
    }

    return (
        <div id="page-auth-login">
            <Button onClick={handleRedirect}>
                Sign Into Your D2X Account to use Arcadia Today!
            </Button>
        </div>
    )
}