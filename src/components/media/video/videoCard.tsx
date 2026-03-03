import { Card, Image } from "@chakra-ui/react"
import Link from "next/link"

export default function VideoCard(
    {
        src, href, title, subText, selected=false
    } : {
        src: string,
        href: string,
        title: string,
        subText: string,
        selected?: boolean
    }
) {
    return (
        <Link href={href}>
            <Card.Root className={`animation-hover ${selected && 'selected'}`}>
                <Image src={src} />
                <Card.Body gap={2}>
                    <Card.Title>{title}</Card.Title>
                    <Card.Description>{subText}</Card.Description>
                </Card.Body>
            </Card.Root>
        </Link>
    )
}