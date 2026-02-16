'use client';


import { Avatar, Button, Drawer, IconButton } from "@chakra-ui/react";
import { useEffect } from "react";
import { Hamburger } from "lucide-react";
import { d2xAPI } from "@/utils/api/d2xAPI";
export default function TopNav() {
    
    useEffect(() => {
        const fetchData = async () => {
            
            const res =  await d2xAPI.GET('auth/exchange/')
        }

        fetchData()
    })

    return (
        <div id="top-nav">
            <div className="icon">
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
                            <Avatar.Image src={'/sad.jpeg'} />
                        </Avatar.Root>
                    </Drawer.Trigger>
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
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