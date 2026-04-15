'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Group, Button, Input } from "@chakra-ui/react";
import Header from "@/components/custom/header";

export default function ArcadiaSearch() {
    const router = useRouter()

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        router.push(`/search?query=${searchQuery}`)
    }

    return (
        <div id="arcadia-search">
            <Header text="Search Arcadia" />
            <form onSubmit={handleSearch}>
                <Group attached>
                    <Input flex="1" placeholder="Bocchi the rock, Honkai, Machico, etc.." onChange={(e) => setSearchQuery(e.target.value)} />
                    <Button loading={loading} type="submit" bg="bg.subtle" variant="outline" onClick={handleSearch}>
                        Search Arcadia
                    </Button>
                </Group>
            </form>
        </div>
    )
}