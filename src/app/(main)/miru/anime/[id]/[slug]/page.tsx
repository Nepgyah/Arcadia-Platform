import { use } from "react"
import { GetAnime, GetAnimeCharacters } from "./animeDetailQueries"

import '@/styles/pages/miru/_anime-details.scss';
import Header from "@/components/custom/header";
import InfoItem from "@/components/custom/info-item";
import CharacterCard from "@/components/custom/character-card";

export default async function AnimeDetails(
    props: {
        params: Promise<{id: string, slug: string}>
    }
) {

    const { id } = await props.params
    const animePromise = GetAnime(id);
    const charactersPromise = GetAnimeCharacters(id)
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
                    <div id="overview-tab">
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
        animePromise : Promise<any>
    }
) {
    const anime = use(animePromise);
    
    return (
        <div id="hero">
            <div className="border-radius-md">
                <img id="hero-image" src={`/storage/miru/${anime.id}.jpg`} />
                <div id="hero-text">
                    <p id="title" className="clr-miru-base">{anime.title}</p>
                    <p id="summary">{anime.summary}</p>
                </div>
            </div>
            <div className="p-a-md">
                <p>Episodes</p>
            </div>
        </div>
    )
}

function Misc({animePromise}:{animePromise : Promise<any>}) {
    const anime = use(animePromise);

    return (
        <div>
            <Header text="Misc" />
            <div className="flex-column">
                <InfoItem label='Season' value={anime.season} />
                <InfoItem label='Rating' value={anime.rating} />
            </div>
        </div>
    )
}

function Production({animePromise}:{animePromise : Promise<any>}) {
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

function Sources({animePromise}:{animePromise : Promise<any>}) {
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

function OverviewCharacters({charactersPromise}:{charactersPromise : Promise<any>}) {
    const characters = use(charactersPromise)
    console.log(characters);

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