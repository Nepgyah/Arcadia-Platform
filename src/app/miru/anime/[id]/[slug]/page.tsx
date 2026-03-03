export const revalidate = 60;

import { Suspense, use } from "react"

import { GetAnime, GetAnimeCharacters, GetAnimeEpisodes, GetAnimeFranchise } from "./(api)/animeDetailQueries"
import { Anime } from "@/types/miru";

import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";

import '@/styles/pages/miru/_anime-details.scss';
import MetaData from "./(main)/metaData";
import OverviewTab from "./(tabs)/overviewTab";
import CharactersTab from "./(tabs)/charactersTab";
import { Button, Link, Skeleton } from "@chakra-ui/react";
import CharacterCardSkeleton from "@/components/media/characters/characterCardSkeleton";
import TabWrapper from "./(tabs)/animeTabWrapper";
import { notFound } from "next/navigation";
import { sleep } from "@/utils/testing/wait";
import EpisodesTab from "./(tabs)/episodesTab";

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
        <div id="page-anime-details" className="page-content">
            <Hero anime={anime}/>
            <div className="split-content">
                <MetaData anime={anime} franchisePromise={franchisePromise} />
                <TabWrapper>
                    <OverviewTab anime={anime} charactersPromise={charactersPromise} franchisePromise={franchisePromise} />
                    <Suspense fallback={<CharacterCardSkeleton />} >
                        <CharactersTab charactersPromise={charactersPromise} />
                    </Suspense>
                    <Suspense fallback={<p>Loading</p>}>
                        <EpisodesTab animeID={id} animeSlug={slug} episodesPromise={episodesPromise}/>
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
        anime : Anime,
    }
) {
    return (
        <div id="hero">
            <SetBreadcrumbs breadcrumbs={['Miru', 'Anime', `${anime.title}`]} />
            <div className="border-radius-md card">
                <img id="hero-image" src={`/storage/miru/${anime.id}/cover.jpg`} />
                <div id="hero-text">
                    <p id="title" className="clr-miru-base">{anime.title}</p>
                    <p id="summary">{anime.summary}</p>
                </div>
            </div>
            <div id="latest-episode" className="p-a-md card">
                {
                    anime.latestEpisode ?
                        <>
                            <p>Latest Episode</p>
                            <p className="clr-miru-base">{anime.latestEpisode.title}</p>
                            <div>
                                <img src={`/storage/miru/${anime.id}/episodes/${anime.latestEpisode.id}.jpg`} />
                                <Button asChild className="btn-primary">
                                    <Link href="#">Watch Now</Link>
                                </Button>
                            </div>
                        </>
                    :
                        <p>No episodes found</p>
                }
            </div>
        </div>
    )
}


