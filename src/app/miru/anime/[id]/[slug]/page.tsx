export const revalidate = 60;

import React from "react";
import { Suspense, use } from "react"
import { notFound } from "next/navigation";
import { Sparkles, UserPlus } from "lucide-react";

import { Skeleton } from "@chakra-ui/react";
import CharacterCardSkeleton from "@/components/shared/characters/characterCardSkeleton";
import SetBreadcrumbs from "@/components/ui/breadcrumbs/setBreadcrumbs";
import Header from "@/components/ui/headers/header";
import { Franchise } from "@/types/base";
import { Anime } from "@/types/miru";
import '@/styles/pages/miru/_anime-details.scss';

import { GetAnime, GetAnimeCharacters, GetAnimeEpisodes, GetAnimeFranchise } from "./query"
import MetaData from "./(main)/metaData";
import OverviewTab from "./(tabs)/overviewTab";
import CharactersTab from "./(tabs)/charactersTab";
import TabWrapper from "./(tabs)/animeTabWrapper";
import EpisodesTab from "./(tabs)/episodesTab";
import { SetBackground } from "@/components/ui/setBackground";
import { string } from "zod";

export default async function Page(
    props: {
        params: Promise<{id: string, slug: string}>
    }
) {

    const { id, slug } = await props.params
    const anime = await GetAnime(id);
    if (!anime) notFound();

    const charactersPromise = GetAnimeCharacters(id);
    const franchisePromise = GetAnimeFranchise(anime.franchise.id);
    const episodesPromise = GetAnimeEpisodes(id)
    
    return (
        <div id="page-anime-details" className="page-content media-detail">
            <SetBackground bgUrl={anime.bgUrl ? anime.bgUrl : '/wallpaper/miru-default.jpg'} />
            <Hero anime={anime}/>
            <div id="main-content">
                <MetaData anime={anime} franchisePromise={franchisePromise} />
                <div>
                    <div id="ranks-franchise">
                        <div id="summary">
                            <Header text="Summary" />
                            <div id="summary-text" dangerouslySetInnerHTML={{ __html: anime.summary }}></div>
                        </div>
                        <Ranks anime={anime} />
                    </div>
                    <TabWrapper>
                        <OverviewTab 
                            anime={anime} 
                            charactersPromise={charactersPromise} 
                            episodesPromise={episodesPromise} 
                            franchisePromise={franchisePromise}
                        />
                        <Suspense fallback={<CharacterCardSkeleton />} >
                            <CharactersTab charactersPromise={charactersPromise} />
                        </Suspense>
                        <Suspense fallback={<p>Loading</p>}>
                            <EpisodesTab animeID={id} animeSlug={slug} episodesPromise={episodesPromise}/>
                        </Suspense>
                    </TabWrapper>
                </div>
            </div>
        </div>
    )
}

function Ranks({anime}:{anime:Anime}) {
    return (
        <div id="ranks">
            <Header text="Rankings" />
            <div id="rank-container">
                <div className="rank card">
                    <UserPlus />
                    <p>Arc Users: {anime.users}</p>
                </div>
                <div className="rank card">
                    <Sparkles />
                    <p>Arc Score: {anime.score == 0 ? 'NA' : anime.score}</p>
                </div>
                <div className="rank card">
                   <img src="/icons/anilist-logo.svg" alt="Anilist logo" />
                   <p>Score: {anime.anilistData.rankScore ? anime.anilistData.rankScore : 'N/A'} | Popularity: {anime.anilistData.rankPopular ? anime.anilistData.rankPopular : 'N/A'}</p>
                </div>
                <div className="rank card">
                    <img src="/icons/mal-logo.svg" alt="Myanimelist logo" />
                   <p>Score: {anime.malData ? anime.malData.rankScore : 'N/A'} | Popularity: {anime.malData ? anime.malData.rankPopular : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}

function Hero(
    {
        anime
    } : {
        anime : Anime,
    }
) {
    return (
        <React.Fragment>
            <SetBreadcrumbs breadcrumbs={['Miru', 'Anime', `${anime.title}`]} />
            <div id="hero" className="border-radius-md card">
                <div className="mask"></div>
                <img id="hero-image" src={anime.bannerImgUrl ? anime.bannerImgUrl : `/storage/miru/${anime.id}/cover.jpg`} alt={anime.title} />
                <div id="titles">
                    <p className="clr-miru-base txt-xxl">{anime.title}</p>
                    <p className="clr-txt-fadded">{anime.titleNative}</p>
                </div>
            </div>
        </React.Fragment>
    )
}
