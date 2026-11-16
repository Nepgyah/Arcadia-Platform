import { Button } from "@chakra-ui/react"
import Link from "next/link"

import '@/styles/components/_section-header.scss';

interface props {
    title: string,
    link?: {
        href: string,
        text: string
    },
}
export default function SectionHeader({
    title,
    link,
}: props) {

    return (
        <div className={`section-header ${link && 'section-header--has-link'}`}>
            <div className="section-header__box"></div>
            <div className="section-header__content">
                <p className="section-header__title">{title}</p>
                {
                    link &&
                    <Link className="section-header__link on-hover on-hover--underline" href={link.href}>{link.text}</Link>
                }
            </div>
        </div>
    )
}