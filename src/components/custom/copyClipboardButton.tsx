'use client';

import { CreateSuccessToaster } from "@/utils/toasterHelpers";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export default function CopyToClipboardButton(
    {
        link,
        text
    }:{
        link: string,
        text: string
    }) {
    const [buttonText, setButtonText] = useState(text)

    const handleCopy = () => {
        navigator.clipboard.writeText(link)
        CreateSuccessToaster('Link copied!')
        setButtonText('Copied!')
        setTimeout(() => {
            setButtonText(text)
        }, 3000)
    }
    return (
        <Button className="btn-primary" onClick={() => handleCopy()}>
            {buttonText}
        </Button>
    )
}