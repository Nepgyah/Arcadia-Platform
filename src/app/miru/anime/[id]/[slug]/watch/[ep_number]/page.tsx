import { arcadiaAPI } from "@/utils/api/arcadiaAPI"
import { notFound } from "next/navigation"

import "@/styles/pages/miru/_watch.scss";
import { AnimeEpisode } from "@/types/miru";
import VideoCard from "@/components/media/video/videoCard";
import Header from "@/components/custom/header";
import Link from "next/link";
import { videos } from "./videos";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";

export default async function Page(
    {
        params
    } : {
        params: Promise<{ id: string, ep_number: number}>
    }
) {
    const { id, ep_number } = await params
    const anime = await FetchAnimeInfo(id)
    if (!anime) return notFound()

    const episodes = await FetchAnimeEpisodes(id)
    const currentEpisode = episodes[ep_number - 1];
    const vidSource = videos[ep_number - 1]
    if (!currentEpisode) return notFound()

    return (
        <div id="page-miru-watch" className="page-content">
            <SetBreadcrumbs breadcrumbs={["Miru", "Watch", `${anime.title}`]} />
            <div>
                <iframe 
                    id='screen' 
                    src={vidSource} 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen 
                />
            </div>
            <div id="details">
                <div id="text" className="flex flex-column row-gap-md">
                    <Link href={`/miru/anime/${anime.id}/${anime.slug}/`} className="clr-miru-base hover-underline">{anime.title}</Link>
                    <h1 className="bold">Ep: {ep_number} - {currentEpisode.title}</h1>
                    <p>{currentEpisode.description}</p>
                </div>
                <div id="episodes">
                    <Header text="Watch More" />
                    <div className="container">
                        {
                            episodes.map((episode: AnimeEpisode, idx: number) => (
                                <VideoCard 
                                    selected={ep_number == episode.number}
                                    key={idx}
                                    src={`/storage/miru/${id}/episodes/${episode.number}.jpg`} 
                                    href={`/miru/anime/${id}/${anime.slug}/watch/${episode.number}`} 
                                    title={`Ep: ${episode.number} - ${episode.title}`} 
                                    subText={episode.description}                            
                                />
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

async function FetchAnimeEpisodes(id: string) {
    const query =
    `
    query {
        getAnimeEpisodes(animeId: ${id}) {
            id,
            title,
            number,
            description
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.getAnimeEpisodes
}

async function FetchAnimeInfo(id: string) {
     const query =
        `
        query {
            animeById(id:${id}) {
                id,
                slug,
                title,
                titleJa,
                score,
                users,
                summary,
                type,
                status,
                rating,
                season,
            }
        }
    `
    
    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.animeById
}