import { use } from "react"
import { GetAnime, GetAnimeCharacters, GetAnimeFranchise } from "./animeDetailQueries"

import '@/styles/pages/miru/_anime-details.scss';
import Header from "@/components/custom/header";
import InfoItem from "@/components/custom/info-item";
import CharacterCard from "@/components/custom/character-card";
import { Tag } from "@chakra-ui/react";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import { Anime } from "@/types/miru";
import { Franchise } from "@/types/base";

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
            <Hero animePromise={animePromise}/>
            <div className="split-content">
                <div className="details">
                    <Misc animePromise={animePromise} />
                    <Production animePromise={animePromise} />
                    <Sources animePromise={animePromise} />
                </div>
                <div>
                    {/* Tab Section Here */}
                    <div id="overview-tab" className="flex flex-column row-gap-md">
                        <div id="genres-franchise">
                            <OverviewGenres animePromise={animePromise} />
                            <OverviewFranchise franchisePromise={franchisePromise} />
                        </div>
                        <div id="overview-characters">
                            <Header text="Characters" />
                            <OverviewCharacters charactersPromise={charactersPromise} />
                        </div>
                    </div>
                </div>
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
                <p>Episodes</p>
            </div>
        </div>
    )
}

function Misc({animePromise}:{animePromise : Promise<Anime>}) {
    const anime = use(animePromise);

    return (
        <div>
            <Header text="Misc" />
            <div className="flex-column">
                <InfoItem label='Status' value={anime.status} />
                <InfoItem label='Season' value={anime.season} />
                <InfoItem label='Rating' value={anime.rating} />
            </div>
        </div>
    )
}

function Production({animePromise}:{animePromise : Promise<Anime>}) {
    const anime = use(animePromise);

    return (
        <div>
            <Header text="Production" />
            <div className="flex-column">
                <InfoItem label='Season' value={anime.season} />
                <InfoItem label='Rating' value={anime.rating} />
            </div>
        </div>
    )
}

function Sources({animePromise}:{animePromise : Promise<Anime>}) {
    const anime = use(animePromise);

    return (
        <div>
            <Header text="Sources" />
            <div className="flex-column">
                <InfoItem label='Season' value={anime.season} />
                <InfoItem label='Rating' value={anime.rating} />
            </div>
        </div>
    )
}
// Overview sections
function OverviewGenres({animePromise}:{animePromise:Promise<any>}) {
    const anime = use(animePromise);

    return (
        <div id="overview-genres">
            <Header text="Genres"/>
            <div className="flex flex-wrap flex-gap-sm">
                {
                    anime.genres.map((genre: any, idx: number) => (
                        <Tag.Root key={idx} size={'xl'} className="card bg-miru-base clr-txt-dark">
                            <Tag.Label>{genre.name}</Tag.Label>
                        </Tag.Root>
                    ))
                }
            </div>
        </div>
    )
}

function OverviewFranchise({franchisePromise}:{franchisePromise : Promise<Franchise>}) {
    const franchise = use(franchisePromise)

    return (
        <div id="overview-franchise">
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

function OverviewCharacters({charactersPromise}:{charactersPromise : Promise<any>}) {
    const characters = use(charactersPromise)

    return (
        <div className="container">
            {
                characters.map((character: any, idx: number) => {
                    if(idx <= 6) {
                        return <CharacterCard character={character} key={idx} />
                    }
                })
            }
        </div>
    )
}