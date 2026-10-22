'use client';

import "@/styles/layout/navigation/_mobile-navigation.scss";
import { URLItem } from "@/types/misc";
import { Avatar, Button, CloseButton, Drawer, Portal, Theme } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import LinkButton from "../ui/button/linkButton";


export default function MobileNavigation({urlSet}:{urlSet: URLItem[]}) {

    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)

    return (
        <div id="mobile-navigation">
            <div id="nav-drawer">
                <NavDrawer 
                    urlSet={urlSet}
                    openState={{
                        isOpen: isNavOpen,
                        setIsOpen: setIsNavOpen
                    }}
                >
                    <Button variant="outline" size="sm">
                        Open Drawer
                    </Button>
                </NavDrawer>
            </div>
            <div id='logo'>
                <Link href={'/'}>
                    <img src={'/brand/logo_white.svg'} />
                </Link>
            </div>
            <div id="profile-drawer">
                <ProfileDrawer
                    openState={{
                        isOpen: isProfileOpen,
                        setIsOpen: setIsProfileOpen
                    }}
                >
                    <Avatar.Root className="on-hover on-hover--cursor">
                        <Avatar.Image src={'/profile-pictures/1.webp'} />
                    </Avatar.Root>
                </ProfileDrawer>
            </div>
        </div>
    )
}

function NavDrawer(
    {
        urlSet,
        openState,
        children
    } : {
        urlSet: URLItem[],
        children: React.ReactNode,
        openState: {
            isOpen: boolean,
            setIsOpen: (e: boolean) => void
        }
    }
) {
    
    return (
        <Drawer.Root 
            id="mobile-navbar"
            placement={'start'} 
            size={'xs'} 
            open={openState.isOpen} 
            onOpenChange={(e) => openState.setIsOpen(e.open)}
        >
            <Drawer.Trigger asChild>
                {children}
            </Drawer.Trigger>
            <Portal>
                <Theme colorPalette={'arcadia'}>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                <Drawer.Content>
              
                    <Drawer.Header>
                    <Drawer.Title>
                        <img id="navbar-logo" src={'/brand/logo_white.svg'} />
                    </Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                    {
                        urlSet.map((node: URLItem, idx: number) => (
                            <LinkButton 
                                key={idx}
                                label={node.label}
                                href={node.href}
                                Icon={node.icon}
                            />
                        ))
                    }
                    </Drawer.Body>
                    <Drawer.Footer>
                        <Button variant="outline" colorPalette={'arcadia'}>Cancel</Button>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild >
                        <CloseButton colorPalette={'arcadia'} size="sm" />
                    </Drawer.CloseTrigger>
          
                </Drawer.Content>
                </Drawer.Positioner>
                </Theme>
            </Portal>
        </Drawer.Root>
    )
}

function ProfileDrawer(
    {
        openState,
        children
    } : {
        children: React.ReactNode,
        openState: {
            isOpen: boolean,
            setIsOpen: (e: boolean) => void
        }
    }
) {
    
    return (
        <Drawer.Root 
            id="mobile-navbar"
            placement={'end'} 
            size={'xs'} 
            open={openState.isOpen} 
            onOpenChange={(e) => openState.setIsOpen(e.open)}
        >
            <Drawer.Trigger asChild>
                {children}
            </Drawer.Trigger>
            <Portal>
                <Theme colorPalette={'arcadia'}>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                <Drawer.Content>
              
                    <Drawer.Header>
                    <Drawer.Title>My Profile</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>

                    </Drawer.Body>
                    <Drawer.Footer>
                        <Button variant="outline" colorPalette={'arcadia'}>Close</Button>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild >
                        <CloseButton colorPalette={'arcadia'} size="sm" />
                    </Drawer.CloseTrigger>
          
                </Drawer.Content>
                </Drawer.Positioner>
                </Theme>
            </Portal>
        </Drawer.Root>
    )
}