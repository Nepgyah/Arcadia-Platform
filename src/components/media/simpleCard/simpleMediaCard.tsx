import Link from "next/link"

export default function SimpleMediaCard(
    {
        app,
        id,
        title,
        href
    } : {
        app: 'miru' | 'yomu' | 'asobu',
        id: number,
        title: string,
        href: string
    }
) {
    return (
        <div className="simple-media">
            <Link href={href}>
                <img src={`/storage/${app}/${id}.jpg`} alt="" className="card animation-hover"/>
            </Link>
            <Link className="hover-underline" href={href} >{title}</Link>
        </div>
    )
}