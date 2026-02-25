'use client';

import { Avatar, Button, Drawer, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Hamburger } from "lucide-react";
import { d2xAPI } from "@/utils/api/d2xAPI";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { toaster } from "../ui/toaster";
import Link from "next/link";

export default function TopNav() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        const getCSRF = async () => {
            // const res =  await d2xAPI.GET('auth/exchange/')
            await arcadiaAPI.GET('util/csrf/')
        }

        const getUser = async () => {
            arcadiaAPI.GET<any>("users/")
            .then((res) => {
                setIsLoggedIn(true)
                setUser(res.user)
                console.log(res.user)
            })
        }
        getCSRF()
        getUser()
    }, [])
    
    const handleDemoLogIn = () => {
        arcadiaAPI.POST("users/demo/login/", {})
        .then(() => {
            setIsLoggedIn(true)
            toaster.create({
                description: 'Demo Login Successful',
                type: 'success'
            })
        })
    }

import { Avatar, Button, Drawer, IconButton } from "@chakra-ui/react";
import { useEffect } from "react";
import { Hamburger } from "lucide-react";
import { d2xAPI } from "@/utils/api/d2xAPI";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
export default function TopNav() {
    
    useEffect(() => {
        const fetchData = async () => {
            
            const res =  await d2xAPI.GET('auth/exchange/')
            // await arcadiaAPI.GET('util/csrf/')
        }

        fetchData()
    })

    return (
        <div id="top-nav">
            <div className="icon">
                <Link href={'/'}>
                    <img src="/logos/logo_white.svg" alt="" />
                </Link>
                <img src="/logos/logo_white.svg" alt="" />
            </div>
            <div className="hamburger">
                <Drawer.Root placement={'start'}>
                    <Drawer.Trigger asChild>
                        <IconButton variant={'ghost'} size={'lg'}>
                            <Hamburger />
                        </IconButton>
                    </Drawer.Trigger>
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                Navigation
                            </Drawer.Header>
                            <Drawer.Body></Drawer.Body>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Drawer.Root>
            </div>
            <div className="profile">
                <Drawer.Root>
                    <Drawer.Trigger asChild>
                        <Avatar.Root>
                            {
                                user ?
                                    <Avatar.Image src={`/storage/preset-profile-pics/${user.picturePreset}.webp`} />
                                :
                                    <Avatar.Image src={'/sad.jpeg'} />
                            }
                            <Avatar.Image src={'/sad.jpeg'} />
                        </Avatar.Root>
                    </Drawer.Trigger>
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Avatar.Root>
                                    {
                                        user ?
                                            <Avatar.Image src={`/storage/preset-profile-pics/${user.picturePreset}.webp`} />
                                        :
                                            <Avatar.Image src={'/sad.jpeg'} />
                                    }
                                </Avatar.Root>
                                <p>{user ? user.username : ''}</p>
                            </Drawer.Header>
                            <Drawer.Body>
                                {
                                    !isLoggedIn &&
                                        <Button onClick={() => handleDemoLogIn()}>
                                            Login as Demo User
                                        </Button>
                                }
                            </Drawer.Body>
                            {/* <Drawer.Footer>
                                Logout
                            </Drawer.Footer> */}
                                <p>My Profile</p>
                                <Avatar.Root>
                                    <Avatar.Image src={'/sad.jpeg'} />
                                </Avatar.Root>
                            </Drawer.Header>
                            <Drawer.Body></Drawer.Body>
                            <Drawer.Footer>
                                Logout
                            </Drawer.Footer>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Drawer.Root>
            </div>
        </div>
    )
}