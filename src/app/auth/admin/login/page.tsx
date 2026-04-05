'use client';

import { useState } from "react";

import { Button, Field, Input } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster, Toaster } from "@/components/ui/toaster";
import { LoginAsAdmin } from "@/utils/actions/oauth";

import '@/styles/pages/auth/_admin-login.scss';
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const handleLogin =  async () => {
        setLoading(true)
        const res = await LoginAsAdmin(username, password)
        if(res.ok) {
            toaster.create({
                title: res.message,
                type: 'success'
            })
            setTimeout(() => {
                window.location.href = '/'
            }, 3000)
        } else {
            setLoading(false)
            toaster.create({
                title: res.message,
                type: 'error'
            })
        }
    }

    return (
        <div id="page-admin-login" className="page-content center-">
            <SetBreadcrumbs breadcrumbs={['Login', 'Admin']} />
            <Toaster />
            <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} 
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