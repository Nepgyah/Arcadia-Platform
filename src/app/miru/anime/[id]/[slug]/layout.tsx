import { notFound } from "next/navigation"
import { GetAnimeAction } from "./action"

import "@/styles/pages/miru/detail.scss"

export default async function Layout(
    {
        children, params
    } : {
        children: React.ReactNode,
        params: Promise<{id: string, slug: string}>
    }
) {
    const { id, slug } = await params
    const result = await GetAnimeAction(Number(id))

    if (!result) {
        notFound()
    }
    
    const anime = result.miru.anime

    return (
        <div id="layout-anime-details">
            <div id="header" className="has-mask arc-card">
                <img src={anime?.bannerImageUrl} />
                <div className="mask mask--gradient"></div>
                <p id="anime-title">{anime?.title}</p>
            </div>
            {children}
        </div>
    )
}