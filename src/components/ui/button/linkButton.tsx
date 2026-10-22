import { Button } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function LinkButton(
    {
        label, href, Icon,
    } : {
        label: string,
        href: string,
        Icon: LucideIcon
    }
) {
    return (
        <Button asChild variant={'ghost'}>
            <Link href={href}>
                <Icon />
                {label}
            </Link>
        </Button>
    )
}