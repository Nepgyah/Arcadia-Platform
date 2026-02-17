import { GetAnime } from "./animeDetailQueries"

export default async function AnimeDetails(
    props: {
        params: Promise<{id: string, slug: string}>
    }
) {

    const { id } = await props.params
    const animeDetails = await GetAnime(id)
    return (
        <div></div>
    )
}