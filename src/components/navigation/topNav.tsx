'use client';

import Link from "next/link";
import { Avatar, Button, Drawer, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HamburgerIcon } from "lucide-react";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { toaster } from "../ui/toaster";
import { useUserStore } from "@/app/store/store";
import { url } from "@/utils/data/urls";
import { redirect, RedirectType } from "next/navigation";
import { Tooltip } from "../ui/tooltip";

export default function TopNav(
    {
        urlSet
    } : {
        urlSet: url[]
    }
) {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)
    const [navOpen, setNavOpen] = useState<boolean>(false)
    const [profileOpen, setProfileOpen] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getCSRF = async () => {
            // const res =  await d2xAPI.GET('auth/exchange/')
            await arcadiaAPI.GET('util/csrf/')
        }

        const getUser = async () => {
            arcadiaAPI.GET<any>("user/")
            .then((res) => {
                setIsLoggedIn(true)
                setUser(res.user)
            })
            .catch((error) => {
                console.log(error)
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

    const handleProfileOpen = (isOpen : boolean) => {
        if (!user) {
            redirect('/auth', RedirectType.push)
        } else {
            setProfileOpen(isOpen)
        }
    }
    return (
        <div id="top-nav">
            <div className="mobile-links">
                <Drawer.Root open={navOpen} onOpenChange={(e) => setNavOpen(e.open)} placement={'start'}>
                    <Drawer.Trigger asChild>
                        <Avatar.Root>
                            <HamburgerIcon />
                        </Avatar.Root>
                    </Drawer.Trigger>
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                Links
                            </Drawer.Header>
                            <Drawer.Body>
                                <VStack alignItems={'start'} rowGap={'1rem'}>
                                    {
                                        urlSet.map((url, idx) => (
                                            <Link onClick={() => setNavOpen(false)} key={idx} href={url.path}>{url.title}</Link>
                                        ))
                                    }
                                </VStack>
                            </Drawer.Body>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Drawer.Root>
            </div>
            <div className="icon">
                <Link href={'/'}>
                    <img src="/logos/logo_white.svg" alt="" />
                </Link>
            </div>
            <div className="profile">
                <Drawer.Root open={profileOpen} onOpenChange={(e) => handleProfileOpen(e.open)}>
                    <Drawer.Trigger asChild className="clickable">
                        
                            <Avatar.Root>
                                {
                                    user ?
                                        <Tooltip content="View your account">
                                            <Avatar.Image src={`/storage/preset-profile-pics/${user.picturePreset}.webp`} />
                                        </Tooltip>
                                    :
                                        <Tooltip content="Login">
                                            <Avatar.Image src={'/storage/preset-profile-pics/not-logged.jpg'} />
                                        </Tooltip>
                                }
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

                            </Drawer.Body>
                            <Drawer.Footer>
                                {  
                                    user && <Button>Logout</Button>
                                }
                            </Drawer.Footer>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Drawer.Root>
            </div>
        </div>
    )
}