"use client";

import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { useEffect } from "react";

export default function MiruHome() {

    useEffect(() => {
        const fetchData = async () => {
            const query = `
            query {
                animeById(id:1) {
                title,
                characters {
                    character {
                        firstName,
                        lastName
                    },
                    role
                    }
                }
            }
            `
            const res = await arcadiaAPI.GraphQL(query)
            console.log(res)
        }
        fetchData()
    }, [])
    return (
        <div>
            Miru Home
        </div>
    )
}