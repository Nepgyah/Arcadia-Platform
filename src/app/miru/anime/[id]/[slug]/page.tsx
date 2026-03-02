export const revalidate = 60;

import { Suspense, use } from "react"

import { GetAnime, GetAnimeCharacters, GetAnimeFranchise } from "./animeDetailQueries"
import { Anime } from "@/types/miru";

import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";

import '@/styles/pages/miru/_anime-details.scss';
import MetaData from "./metaData";
import OverviewTab from "./overviewTab";
import CharactersTab from "./charactersTab";
import { Skeleton } from "@chakra-ui/react";
import CharacterCardSkeleton from "@/components/media/characters/characterCardSkeleton";
import TabWrapper from "./animeTabWrapper";
import { notFound } from "next/navigation";
import { sleep } from "@/utils/testing/wait";

export default async function AnimeDetails(
    props: {
        params: Promise<{id: string, slug: string}>
    }
) {

    const { id } = await props.params
    const charactersPromise = GetAnimeCharacters(id);
    const franchisePromise = GetAnimeFranchise(id);

    const anime = await GetAnime(id);

    if (!anime) notFound();

    return (
        <div id="page-anime-details" className="page-content">
            <Hero anime={anime}/>
            <div className="split-content">
                <MetaData anime={anime} franchisePromise={franchisePromise} />
                <TabWrapper>
                    <OverviewTab anime={anime} charactersPromise={charactersPromise} franchisePromise={franchisePromise} />
                    <Suspense fallback={<CharacterCardSkeleton />} >
                        <CharactersTab charactersPromise={charactersPromise} />
                    </Suspense>
                </TabWrapper>
            </div>
        </div>
    )
}

function Hero(
    {
        anime
    } : {
        anime : Anime
    }
) {
    return (
        <div id="hero">
            <SetBreadcrumbs breadcrumbs={['Miru', 'Anime', `${anime.title}`]} />
            <div className="border-radius-md card">
                <img id="hero-image" src={`/storage/miru/${anime.id}.jpg`} />
                <div id="hero-text">
                    <p id="title" className="clr-miru-base">{anime.title}</p>
                    <p id="summary">{anime.summary}</p>
                </div>
            </div>
            <div className="p-a-md card">
                <p>WIP</p>
            </div>
        </div>
    )
}

