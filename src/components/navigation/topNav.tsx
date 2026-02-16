'use client';

import { apiGET } from "@/utils/api/get";
import { Avatar } from "@chakra-ui/react";
import { useEffect } from "react";

export default function TopNav() {
    
    useEffect(() => {
        const fetchData = async () => {
            const res =  await apiGET('auth/exchange/')
        }

        fetchData()
    })

    return (
        <div id="top-nav">
            <div className="icon">
                <img src="/logos/logo_white.svg" alt="" />
            </div>
            <div className="hamburger">
                burger
            </div>
            <div className="profile">
                <Avatar.Root>
                    <Avatar.Image src={'/sad.jpeg'} />
                </Avatar.Root>
            </div>
        </div>
    )
}