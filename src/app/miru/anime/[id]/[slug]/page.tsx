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

export default async function AnimeDetails(
    props: {
        params: Promise<{id: string, slug: string}>
    }
) {

    const { id } = await props.params
    const animePromise = GetAnime(id);
    const charactersPromise = GetAnimeCharacters(id);
    const franchisePromise = GetAnimeFranchise(id);

    return (
        <div id="page-anime-details" className="page-content">
            <Suspense fallback={<HeroSkeleton />}>
                <Hero animePromise={animePromise}/>
            </Suspense>
            <div className="split-content">
                <MetaData animePromise={animePromise} franchisePromise={franchisePromise} />
                <TabWrapper>
                    <OverviewTab animePromise={animePromise} charactersPromise={charactersPromise} franchisePromise={franchisePromise} />
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
        animePromise
    } : {
        animePromise : Promise<Anime>
    }
) {
    const anime = use(animePromise);
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

function HeroSkeleton() {
    return (
        <div id="hero">
            <Skeleton height={250} width={'100%'}/>
            <Skeleton height={250} width={'100%'}/>
        </div>
    )
}