import Link from "next/link"

export default function SimpleMediaCard(
    {
        app,
        id,
        title,
        imagePath,
        href
    } : {
        app: 'miru' | 'yomu' | 'asobu',
        id: number,
        title: string,
        imagePath: string,
        href: string
    }
) {
    return (
        <div className="simple-media">
            <Link href={href}>
                <img src={imagePath} alt="" className="card animation-hover"/>
            </Link>
            <Link className="hover-underline" href={href} >{title}</Link>
        </div>
    )
}