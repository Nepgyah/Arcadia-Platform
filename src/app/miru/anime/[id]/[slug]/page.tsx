export const revalidate = 60;

import { Suspense, use } from "react"
import { notFound } from "next/navigation";
import { Anime } from "@/types/miru";

import { Button, Link, Skeleton } from "@chakra-ui/react";

import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import MetaData from "./(main)/metaData";
import OverviewTab from "./(tabs)/overviewTab";
import CharactersTab from "./(tabs)/charactersTab";
import CharacterCardSkeleton from "@/components/media/characters/characterCardSkeleton";
import TabWrapper from "./(tabs)/animeTabWrapper";
import EpisodesTab from "./(tabs)/episodesTab";

import { GetAnime, GetAnimeCharacters, GetAnimeEpisodes, GetAnimeFranchise } from "./(api)/animeDetailQueries"
import '@/styles/pages/miru/_anime-details.scss';
import React from "react";
import { Franchise } from "@/types/base";
import Header from "@/components/custom/header";
import { Sparkles, UserPlus } from "lucide-react";
import VideoCard from "@/components/media/video/videoCard";

export default async function Page(
    props: {
        params: Promise<{id: string, slug: string}>
    }
) {

    const { id, slug } = await props.params
    const charactersPromise = GetAnimeCharacters(id);
    const franchisePromise = GetAnimeFranchise(id);
    const episodesPromise = GetAnimeEpisodes(id)
    const anime = await GetAnime(id);

    if (!anime) notFound();

    return (
        <div id="page-anime-details" className="page-content media-detail">
            <Hero anime={anime}/>
            <div id="main-content">
                <MetaData anime={anime} franchisePromise={franchisePromise} />
                <div>
                    <div id="ranks-news">
                        <Ranks anime={anime} />
                        <Suspense fallback={<Skeleton height="200px" width={'100%'}/>}>
                            <AnimeFranchise franchisePromise={franchisePromise} />
                        </Suspense>
                    </div>
                    <TabWrapper>
                        <OverviewTab anime={anime} charactersPromise={charactersPromise} episodesPromise={episodesPromise} />
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
            <Header text="Synopsis" />
            <div id="rank-container">
                <div className="rank card">
                    <UserPlus />
                    <p>Users: {anime.users}</p>
                </div>
                <div className="rank card">
                    <Sparkles />
                    <p>Score: {anime.score == 0 ? 'NA' : anime.score}</p>
                </div>
                <div className="rank card">
                   <img src="/icons/anilist-logo.svg" alt="" />
                   <p>Anilist Rank: N/A</p>
                </div>
                <div className="rank card">
                    ?
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
            <img id="hero-image" src={anime.bannerImgUrl ? anime.bannerImgUrl : `/storage/miru/${anime.id}/cover.jpg`} />
            <div id="titles">
                <p className="clr-miru-base txt-xxl">{anime.title}</p>
                <p className="clr-txt-fadded">{anime.titleNative}</p>
            </div>
        </div>
        </React.Fragment>
    )
}

function AnimeFranchise({franchisePromise}:{franchisePromise : Promise<Franchise>}) {
    const franchise = use(franchisePromise)

    return (
        <div id="franchise">
            <Header text="Franchise"/>
            {
                franchise ?
                    <div className="card">
                        <img src={`/storage/franchise/${franchise.id}.jpg`} />
                        <div className="mask"></div>
                        <p>{franchise.name}</p>
                    </div>
                :
                    <p>No Franchise found</p>
            }
        </div>
    )
}

