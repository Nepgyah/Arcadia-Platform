import CharacterCard from "@/components/media/characters/character-card";
import Header from "@/components/custom/header";
import RelationMedia from "@/components/media/relation-media";
import { Franchise } from "@/types/base";
import { Anime } from "@/types/miru";
import { Skeleton, Tag } from "@chakra-ui/react";
import { Suspense, use } from "react";
import CharacterCardSkeleton from "@/components/media/characters/characterCardSkeleton";

export default function OverviewTab(
    {
        animePromise, charactersPromise, franchisePromise
    } : {
        animePromise: Promise<Anime>,
        charactersPromise: Promise<any[]>,
        franchisePromise: Promise<Franchise>
    }
) {
    return (
        <div id="overview-tab" className="flex flex-column row-gap-md">
            <div id="genres-franchise">
                <Suspense fallback={<Skeleton height="200px" width={'100%'}/>}>
                    <Genres animePromise={animePromise} />
                </Suspense>
                <Suspense fallback={<Skeleton height="200px" width={'100%'}/>}>
                    <AnimeFranchise franchisePromise={franchisePromise} />
                </Suspense>
            </div>
            <div id="overview-characters">
                <Header text="Characters" />
                <Suspense fallback={<CharacterCardSkeleton />}>
                    <Characters charactersPromise={charactersPromise} />
                </Suspense>
            </div>
            <div id="relationships">
                <Header text="Anime Flow" />
                <Suspense fallback={<Skeleton height="200px" width={'100%'}/>}>
                    <Relationships animePromise={animePromise} />
                </Suspense>
            </div>
        </div>
    )
}

// Overview sections
function Genres({animePromise}:{animePromise:Promise<any>}) {
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

function AnimeFranchise({franchisePromise}:{franchisePromise : Promise<Franchise>}) {
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

function Characters({charactersPromise}:{charactersPromise : Promise<any>}) {
    const characters = use(charactersPromise)

    return (
        <div className="character-container">
            {
                characters.map((character: any, idx: number) => {
                    if(idx < 6) {
                        return <CharacterCard character={character} key={idx} />
                    }
                })
            }
        </div>
    )
}

function Relationships({animePromise}:{animePromise: Promise<any>}) {
    const anime = use(animePromise);

    return (
        <div>
            <div id="main-flow">
                <div id="prequel">
                    {
                        anime.prevAnime ?
                            <RelationMedia 
                                media={anime.prevAnime.anime} 
                                app="miru" 
                                relation="Prequel"
                                link={`/miru/anime/${anime.prevAnime.anime.id}/${anime.prevAnime.anime.slug}`}
                            />
                        :
                            <p>No Prequel Found</p>
                    }
                </div>
                <div id="sequel">
                    {
                        anime.nextAnime ?
                            <RelationMedia 
                                media={anime.nextAnime.anime} 
                                app="miru" 
                                relation="Sequel"
                                link={`/miru/anime/${anime.nextAnime.anime.id}/${anime.nextAnime.anime.slug}`}
                            />
                        :
                            <p>No Prequel Found</p>
                    }
                </div>
            </div>
        </div>
    )
}