'use client';

import { useState } from "react";

import { Button, Field, Input } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster, Toaster } from "@/components/ui/toaster";
import SetBreadcrumbs from "@/components/ui/breadcrumbs/setBreadcrumbs";
import { LoginAsAdmin } from "@/actions/auth-actions";
import "@/styles/pages/auth/_admin-login.scss";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const handleLogin =  async () => {
        setLoading(true)
        LoginAsAdmin(email, password)
        .then((res) => {
            toaster.create({
                title: res,
                type: 'success'
            })
            setTimeout(() => {
                window.location.href = '/'
            }, 3000)
        })
        .catch((res) => {
            setLoading(false)
            toaster.create({
                title: res,
                type: 'error'
            })
        })
    }

    return (
        <div id="page-admin-login" className="page-content center-">
            <SetBreadcrumbs breadcrumbs={['Login', 'Admin']} />
            <Toaster />
            <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                    placeholder="Username"
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