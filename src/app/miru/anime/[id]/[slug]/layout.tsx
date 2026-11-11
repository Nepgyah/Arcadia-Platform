import { notFound } from "next/navigation"
import { GetAnimeAction } from "./action"

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
    
    return (
        <div id="layout-anime-details">
            {children}
        </div>
    )
}