export const revalidate = 60;

import { Suspense, use } from "react";

import SetBreadcrumbs from "@/components/ui/breadcrumbs/setBreadcrumbs";
import { Anime } from "@/types/miru";
import LinkedHeader from "@/components/ui/headers/linkedHeader";
import SimpleMediaCard from "@/components/shared/mediaCards/simpleCard/simpleMediaCard";
import SimpleMediaCardSkeleton from "@/components/shared/mediaCards/simpleCard/simpleMediaCardSkeleton";
import '@/styles/pages/miru/_home.scss';

import { GetPopularAnime, GetRatedAnime } from "./miruHomeQueries";

export default async function MiruHome() {

    const popularAnimePromise = GetPopularAnime();
    const highestRatedAnimePromise = GetRatedAnime();

    return (
        <div id="page-miru-home">
            <SetBreadcrumbs breadcrumbs={['Miru', 'Home']} />
            <div id="anime-lists" className="flex flex-column row-gap-md">
                <div id="score">
                    <LinkedHeader text="Highest Rated" href="/miru/all-time" linkText="See More" />
                    <Suspense fallback={<AnimeListSkeleton />}>
                        <AnimeList animePromise={highestRatedAnimePromise} />
                    </Suspense>
                </div>
                <div id="popular">
                    <LinkedHeader text="Most Popular" href="/miru/popular" linkText="See More"/>
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
                animes.map((anime: Anime, idx: number) => (
                    <SimpleMediaCard 
                        key={idx} app="miru" 
                        title={anime.title} 
                        id={anime.id} 
                        imagePath={anime.coverImgUrl ? anime.coverImgUrl : `/storage/miru/${anime.id}/cover.jpg`}
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