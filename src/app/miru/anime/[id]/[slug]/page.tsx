export const revalidate = 60;

import { Suspense, use } from "react"
import { notFound } from "next/navigation";
import { Anime } from "@/types/miru";

import { Button, Link } from "@chakra-ui/react";

import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import MetaData from "./(main)/metaData";
import OverviewTab from "./(tabs)/overviewTab";
import CharactersTab from "./(tabs)/charactersTab";
import CharacterCardSkeleton from "@/components/media/characters/characterCardSkeleton";
import TabWrapper from "./(tabs)/animeTabWrapper";
import EpisodesTab from "./(tabs)/episodesTab";

import { GetAnime, GetAnimeCharacters, GetAnimeEpisodes, GetAnimeFranchise } from "./(api)/animeDetailQueries"
import '@/styles/pages/miru/_anime-details.scss';

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
            <div id="synopsis" className="border-radius-md card">
                <img id="hero-image" src={anime.bannerImgUrl ? anime.bannerImgUrl : `/storage/miru/${anime.id}/cover.jpg`} />
                <div id="hero-text">
                    <p id="title" className="clr-miru-base">{anime.title}</p>
                    <p id="summary" dangerouslySetInnerHTML={{ __html: anime.summary }}></p>
                </div>
            </div>
            <div id="latest" className="p-a-md border-radius-md card">
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


