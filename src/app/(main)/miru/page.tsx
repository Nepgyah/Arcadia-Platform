import Header from "@/components/custom/header";
import { GetPopularAnime, GetRatedAnime } from "./miruHomeQueries"
import { use } from "react";
import SimpleMediaCard from "@/components/custom/simple-media-card";

import '@/styles/pages/miru/_home.scss';

export default async function MiruHome() {

    const popularAnimePromise = GetPopularAnime();
    const highestRatedAnimePromise = GetRatedAnime();

    return (
        <div id="page-miru-home">
            <div id="anime-lists" className="flex flex-column row-gap-md">
                <div id="score">
                    <Header text="Highest Rated" />
                    <AnimeList animePromise={highestRatedAnimePromise} />
                </div>
                <div id="popular">
                    <Header text="Most Popular" />
                    <AnimeList animePromise={popularAnimePromise} />
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
                    <SimpleMediaCard key={idx} app="miru" title={anime.title} id={anime.id} slug={anime.slug}/>
                )) 
            }
        </div>
    )
}
