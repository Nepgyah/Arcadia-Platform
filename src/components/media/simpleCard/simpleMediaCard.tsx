import Link from "next/link"

export default function SimpleMediaCard(
    {
        app,
        id,
        title,
        slug
    } : {
        app: 'miru' | 'yomu' | 'asobu',
        id: number,
        title: string,
        slug: string
    }
) {
    return (
        <div className="simple-media">
            <img src={`/storage/${app}/${id}.jpg`} alt="" className="card animation-hover"/>
            <Link className="hover-underline" href={`miru/anime/${id}/${slug}`} >{title}</Link>
        </div>
    )
}