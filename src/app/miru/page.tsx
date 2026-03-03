export const dynamic = "force-dynamic";

import { Suspense, use } from "react";

import Header from "@/components/custom/header";
import { GetPopularAnime, GetRatedAnime } from "./miruHomeQueries"
import SimpleMediaCard from "@/components/media/simpleCard/simpleMediaCard";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import SimpleMediaCardSkeleton from "@/components/media/simpleCard/simpleMediaCardSkeleton";

import '@/styles/pages/miru/_home.scss';

export default async function MiruHome() {

    const popularAnimePromise = GetPopularAnime();
    const highestRatedAnimePromise = GetRatedAnime();

    return (
        <div id="page-miru-home">
            <SetBreadcrumbs breadcrumbs={['Miru', 'Home']} />
            <div id="anime-lists" className="flex flex-column row-gap-md">
                <div id="score">
                    <Header text="Highest Rated" />
                    <Suspense fallback={<AnimeListSkeleton />}>
                        <AnimeList animePromise={highestRatedAnimePromise} />
                    </Suspense>
                </div>
                <div id="popular">
                    <Header text="Most Popular" />
                    <Suspense fallback={<AnimeListSkeleton />}>
                        <AnimeList animePromise={popularAnimePromise} />
                    </Suspense>
                </div>
            </div>
            <div id="friend-activity">
                WIP
            </div>
        </div>
    )
}

function AnimeList({animePromise}:{animePromise: Promise<any>}) {
    const animes = use(animePromise)

    return (
        <div className="container">
            {
                animes.map((anime: any, idx: number) => (
                    <SimpleMediaCard 
                        key={idx} app="miru" 
                        title={anime.title} 
                        id={anime.id} 
                        imagePath={`/storage/miru/${anime.id}/cover.jpg`}
                        href={`miru/anime/${anime.id}/${anime.slug}`}
                    />
                )) 
            }
        </div>
    )
}

function AnimeListSkeleton() {
    return (
        <div className="container">
        {
            Array.from({length: 5}).map((_, idx) => (
                <SimpleMediaCardSkeleton key={idx} />
            ))
        }
        </div>
    )
}