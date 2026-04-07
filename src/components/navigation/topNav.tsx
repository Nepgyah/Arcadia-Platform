'use client';
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect, RedirectType, useRouter } from "next/navigation";

import { HamburgerIcon } from "lucide-react";
import { Avatar, Button, Drawer, VStack } from "@chakra-ui/react";

import { useUserStore } from "@/app/store/store";
import { handleGetUser, logoutUser } from "@/utils/actions/user";
import { url } from "@/utils/data/urls";

export default function TopNav(
    {
        urlSet
    } : {
        urlSet: url[]
    }
) {
    const router = useRouter();
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)
    const [navOpen, setNavOpen] = useState<boolean>(false)
    const [profileOpen, setProfileOpen] = useState<boolean>(false)

    useEffect(() => {
        const getCSRF = async () => {
            // await arcadiaAPI.GET('util/csrf/')
        }

        const getUser = async () => {
            let user = await handleGetUser()
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        }
        getCSRF()
        getUser()
    }, [])

    const handleProfileOpen = (isOpen : boolean) => {
        if (!user) {
            redirect('/auth', RedirectType.push)
        } else {
            setProfileOpen(isOpen)
        }
    }

    const handleLogout = async () => {
        setProfileOpen(false)

        try {
            await logoutUser()
            setUser(null)
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    const handleViewProfile = () => {
        router.push(`/profile/${user.id}`)
        setProfileOpen(!profileOpen)
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
            <div className="profile">
                <Drawer.Root open={profileOpen} onOpenChange={(e) => handleProfileOpen(e.open)}>
                    <Drawer.Trigger asChild className="clickable">
                            <Avatar.Root>
                                {
                                    user != null ?
                                        <Avatar.Image src={`/storage/preset-profile-pics/${user.picturePreset}.webp`} />
                                    :
                                         <Avatar.Image src={`/storage/preset-profile-pics/not-logged.jpg`} />
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
                                {
                                    user && <Button onClick={handleViewProfile}>View Profile</Button>
                                }
                            </Drawer.Body>
                            <Drawer.Footer>
                                {  
                                    user && <Button onClick={() => handleLogout()}>Logout</Button>
                                }
                            </Drawer.Footer>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Drawer.Root>
            </div>
        </div>
    )
}