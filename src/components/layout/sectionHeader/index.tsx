import { Button } from "@chakra-ui/react"
import Link from "next/link"

import '@/styles/components/_section-header.scss';

interface props {
    title: string,
    link?: {
        href: string,
        text: string
    }
}
export default function SectionHeader(props: props) {

    return (
        <div className={`section-header ${props.link && 'section-header--has-link'}`}>
            <div className="section-header__box" ></div>
            <p className="section-header__title">{props.title}</p>
            {
                props.link &&
                <Link className="section-header__link on-hover on-hover--underline" href={props.link.href}>{props.link.text}</Link>
            }
        </div>
    )
}