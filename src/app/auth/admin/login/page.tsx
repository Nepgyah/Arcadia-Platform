'use client';

import { useState } from "react";

import { Button, Field, Input } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster, Toaster } from "@/components/ui/toaster";
import SetBreadcrumbs from "@/components/ui/breadcrumbs/setBreadcrumbs";
import { LoginAsAdmin } from "@/actions/auth-actions";
import { CreateErrorToaster, CreateSuccessToaster } from "@/lib/helper/toasterHelpers";
import "@/styles/pages/auth/_admin-login.scss";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const handleLogin =  async () => {
        setLoading(true)
        const result = await LoginAsAdmin(email, password)

        if (result.success) {
            CreateSuccessToaster('Logging In')
            setTimeout(() => {
                window.location.href = '/'
            }, 3000)
        } else {
            setLoading(false)
            CreateErrorToaster(result.error)
        }
    }

    return (
        <div id="page-admin-login" className="page-content center-">
            <SetBreadcrumbs breadcrumbs={['Login', 'Admin']} />
            <Toaster />
            <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </Field.Root>

            <Field.Root>
                <Field.Label>Password</Field.Label>
                <PasswordInput
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </Field.Root>

            <Button onClick={() => handleLogin()} loading={loading}>
                Login
            </Button>
        </div>
    )
}