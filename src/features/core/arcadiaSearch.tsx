'use client';

import { Input, InputGroup } from "@chakra-ui/react";
import { Search } from "lucide-react";

export default function ArcadiaSearch() {

    return (
        <div id='search-arcadia'>
            <InputGroup startElement={<Search />} >
                <Input placeholder="Search Arcadia" />
            </InputGroup>
        </div>
    )
}