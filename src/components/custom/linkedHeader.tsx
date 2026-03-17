import Link from "next/link"

export default function LinkedHeader({
    text,
    linkText,
    href
} : {
    text : string,
    linkText: string,
    href: string
}) {
    return (
        <div className="header header--linked">
            <div>
                <div className="header__box"></div>
                <h2>{text}</h2>
            </div>
            <Link className="hover-underline" href={href}>{linkText}</Link>
        </div>
    )
}