'use client';

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as z from 'zod';
import { Group, Button, Input } from "@chakra-ui/react";
import Header from "@/components/custom/header";
import { toaster } from "@/components/ui/toaster";

const SearchQuery = z.object({
    query: z.string().min(3, 'Please enter at least 3 letters')
})

export default function ArcadiaSearch() {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            SearchQuery.parse({
                query: searchQuery
            })
            router.push(`/search?query=${searchQuery}`)
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                if (inputRef.current) {
                    inputRef.current.focus()
                }
                toaster.create({
                    title: error.issues[0].message,
                    type: 'error'
                })
            }
        }
    }

    return (
        <div id="arcadia-search">
            <Header text="Search Arcadia" />
            <form onSubmit={handleSearch}>
                <Group attached>
                    <Input ref={inputRef} id="search-input" flex="1" placeholder="Bocchi the rock, Honkai, Machico, etc.." onChange={(e) => setSearchQuery(e.target.value)} />
                    <Button loading={loading} type="submit" bg="bg.subtle" variant="outline" onClick={handleSearch}>
                        Search Arcadia
                    </Button>
                </Group>
            </form>
        </div>
    )
}