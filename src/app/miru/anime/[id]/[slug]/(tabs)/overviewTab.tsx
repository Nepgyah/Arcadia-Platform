import { Suspense, use } from "react";

import { Skeleton, Tag } from "@chakra-ui/react";

import { Franchise } from "@/types/base";
import { Anime } from "@/types/miru";

import Header from "@/components/custom/header";
import CharacterCard from "@/components/media/characters/character-card";
import RelationMedia from "@/components/media/relation-media";
import CharacterCardSkeleton from "@/components/media/characters/characterCardSkeleton";

export default function OverviewTab(
    {
        anime, charactersPromise, franchisePromise
    } : {
        anime: Anime,
        charactersPromise: Promise<any[]>,
        franchisePromise: Promise<Franchise>
    }
) {
    return (
        <div id="overview-tab" className="flex flex-column row-gap-md">
            <div id="genres-franchise" className="two-column">
                <Genres anime={anime} />
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
            <div id="relationships" >
                <Header text="Anime Flow" />
                <Suspense fallback={<Skeleton height="200px" width={'100%'}/>}>
                    <Relationships anime={anime} />
                </Suspense>
            </div>
        </div>
    )
}

// Overview sections
function Genres({anime}:{anime : Anime}) {

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
        <div id="franchise-section">
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
                characters.map((entry: any, idx: number) => {
                    if(idx < 6) {
                        return <CharacterCard 
                                    key={idx} 
                                    lSideTitle={`${entry.character.firstName} ${entry.character.lastName != null ? entry.character.lastName : ''}`}
                                    lSideNote={entry.role}
                                    lSideSrc={`/storage/characters/${entry.character.id}.jpg`}
                                    lSideLink={null}
                                    rSideTitle={`${entry.character.voiceActor.firstName} ${entry.character.voiceActor.lastName}`}
                                    rSideNote="Japanese"
                                    rSideSrc={`/storage/voice-actors/${entry.character.voiceActor.id}.jpg`}
                                    rSideLink={`/voice-actor/${entry.character.voiceActor.id}/${entry.character.voiceActor.slug}`}
                                />
                    }
                })
            }
        </div>
    )
}

function Relationships({anime}:{anime : Anime}) {

    return (
        <div>
            <div className="two-column">
                <div id="prequel">
                    {
                        anime.prevAnime ?
                            <RelationMedia 
                                media={anime.prevAnime.anime} 
                                app="miru" 
                                relation="Prequel"
                                link={`/miru/anime/${anime.prevAnime.anime.id}/${anime.prevAnime.anime.slug}`}
                                src={`/storage/miru/${anime.prevAnime.anime.id}/cover.jpg`}
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
                                src={`/storage/miru/${anime.nextAnime.anime.id}/cover.jpg`}
                            />
                        :
                            <p>No Prequel Found</p>
                    }
                </div>
            </div>
        </div>
    )
}