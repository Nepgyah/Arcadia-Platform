import { AppType } from "@/types/arcadia"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

export interface IconTabButtonProps {
    app: AppType,
    label: string,
    href: string,
    Icon: LucideIcon
}
export default function IconTabButton(props: IconTabButtonProps) {

    return (
        <Link href={props.href}>
            <div className="icon-tab-button">
                <div className="icon-tab-button__icon">
                    <props.Icon />
                </div>
                <div className="icon-tab-button__label">
                    <p>{props.label}</p>
                </div>
            </div>
        </Link>
    )
}