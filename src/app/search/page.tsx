export const dynamic = 'force-dynamic';

import Header from "@/components/ui/headers/header";

import { GraphqlResponse } from "@/types/api";
import { Media } from "@/types/base";
import { Anime } from "@/types/miru";
import { arcadiaAPI } from "@/lib/api/arcadiaAPI";


import '@/styles/pages/_search.scss';
import SimpleMediaCard from "@/components/shared/mediaCards/simpleCard/simpleMediaCard";
import { AsobuGame } from "@/types/asobu";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = (await searchParams).query
    const searchResult = await FetchArcadiaSearch(String(query))
    const anime = searchResult.miru.animes.results
    const games = searchResult.asobu.games.results
    // const voiceActors = searchResult.searchArcadia.voiceActors

    return (
        <div id="page-arcadia-search" className="page-content default-schema">
            {
                anime.length > 0 &&
                <div id="miru">
                    <Header text="Miru" />
                    <div className="container">
                       {
                         anime.map((media: Anime, idx: number) => (
                                <SimpleMediaCard 
                                    key={idx}
                                    id={media.id}
                                    app='miru'
                                    title={media.title}
                                    imagePath={media.coverImgUrl ? media.coverImgUrl : `/storage/miru/${media.id}/cover.jpg`}
                                    href={`miru/anime/${media.id}/${media.slug}`}
                                />
                            ))
                       }
                    </div>
                </div>
            }
            {
                games.length > 0 &&
                <div id="asobu">
                    <Header text="Asobu" />
                    <div className="container">
                        {
                            games.map((media: Media, idx: number) => (
                                <SimpleMediaCard 
                                    key={idx}
                                    id={media.id}
                                    app='asobu'
                                    title={media.title}
                                    imagePath={`/storage/asobu/${media.id}/cover.jpg`}
                                    href={`asobu/game/${media.id}/${media.slug}`}
                                />
                            ))
                        }
                    </div>
                </div>
            }
            {/* {
                voiceActors.length > 0 &&
                <div id="voice-actors">
                    <Header text="Voice Actors" />
                    <div className="container">
                        {
                            voiceActors.map((actor: any, idx: number) => (
                                <SimpleMediaCard 
                                    key={idx}
                                    id={actor.id}
                                    app='asobu'
                                    title={actor.displayName}
                                    imagePath={actor.coverImgUrl ? actor.coverImgUrl : `/storage/voice-actors/${actor.id}.jpg`}
                                    href={`/voice-actor/${actor.id}/${actor.slug}`}
                                />
                            ))
                        }
                    </div>
                </div>
            } */}
        </div>
    )
}

interface APIResponse {
    asobu: {
        games: {
            results: AsobuGame[]
        }
    },
    miru: {
        animes: {
            results: Anime[]
        }
    }
}
async function FetchArcadiaSearch(queryString: string) : Promise<APIResponse> {
    'use server';
    const query = 
    `
    query ($queryString: String!) {
        miru {
            animes (filters: {title: $queryString}) {
            results {
                id,
                title,
                slug,
                coverImgUrl
            }
            }
        },
        asobu {
            games (filters: {title: $queryString}) {
            results {
                id,
                title,
                slug,
            }
            }
        }
    }
    `

    const variables = {
        'queryString': queryString
    }

    const result = await arcadiaAPI.GraphQL<GraphqlResponse<APIResponse>>(query, variables);
    console.log(result)
    return result.data
}