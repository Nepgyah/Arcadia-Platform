import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function LoginRequired() {
    return (
        <div id="login-required" className="default-schema">
            <img src="/pages/loginRequired.png" alt="" />
            <p>You need be logged in to use this feature</p>
            <div className="button-container">
                <Link href={'/auth'}>
                    <Button className="btn-primary">Login</Button>
                </Link>
            </div>
        </div>
    )
}