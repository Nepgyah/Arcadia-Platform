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
    GetAnimeAction(Number(id))

    return (
        <div>
            {children}
        </div>
    )
}