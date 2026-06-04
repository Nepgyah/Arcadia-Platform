import Header from "@/components/ui/headers/header"
import CharacterCard from "@/components/shared/characters/character-card"
import CharacterCardSkeleton from "@/components/shared/characters/characterCardSkeleton"
import RelationMedia from "@/components/shared/relation-media"
import { AsobuGame } from "@/types/asobu"
import { Skeleton } from "@chakra-ui/react"
import { Suspense, use } from "react"
import { Franchise, MediaCast } from "@/types/base"

export default function Overviewtab(
    {
        game, characterPromise, franchisePromise
    } : {
        game: AsobuGame,
        characterPromise: Promise<any>,
        franchisePromise: Promise<any>
    }
) {
    return (
        <div id="overview-tab" className="flex flex-column row-gap-md">
            <div id="summary-news" className="two-column">
                <div id="news">
                    <Header text="Trailer" />
                    <div>
                        {
                            game.trailerUrl ? 
                            <iframe 
                                id='screen' 
                                className="border-radius-md shadow"
                                src={game.trailerUrl} 
                                title="YouTube video player" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen 
                            />
                            :
                                <p>No Trailer found</p>
                        }
                    </div>
                </div>
                <GameFranchise franchisePromise={franchisePromise} />
            </div>
            <div id="overview-characters">
                <Header text="Main Characters" />
                <Suspense fallback={<CharacterCardSkeleton />}>
                    <Characters charactersPromise={characterPromise} />
                </Suspense>
            </div>
            <div id="relationships" >
                <Header text="Game Flow" />
                <Suspense fallback={<Skeleton height="200px" width={'100%'}/>}>
                    <Relationships game={game} />
                </Suspense>
            </div>
        </div>
    )
}

function Characters({charactersPromise}:{charactersPromise : Promise<MediaCast[]>}) {
    const characters = use(charactersPromise)
    const mainCharacters = characters.filter((character) => character.role === "Main")

    return (
        <div className="character-container">
            {
                mainCharacters.map((entry: MediaCast, idx: number) => {
                    if(idx < 6) {
                        let lSideSrc = (entry.character.coverImgUrl) ? entry.character.coverImgUrl : `/storage/characters/${entry.character.id}.jpg`
                        let rSideSrc = null
    
                        if (entry.voiceActor) {
                            if (entry.voiceActor.coverImgUrl) {
                                rSideSrc = entry.voiceActor.coverImgUrl
                            } else {
                                rSideSrc = `/storage/voice-actors/${entry.voiceActor.id}.jpg`
                            }
                        }
                        return <CharacterCard 
                                    key={idx} 
                                    lSideTitle={`${entry.character.fullName}`}
                                    lSideNote={entry.role}
                                    lSideSrc={lSideSrc}
                                    lSideLink={null}
                                    rSideTitle={entry.voiceActor ? `${entry.voiceActor.fullName}` : 'N/A'}
                                    rSideNote="Japanese"
                                    rSideSrc={rSideSrc}
                                    rSideLink={entry.voiceActor ? `/voice-actor/${entry.voiceActor.id}/${entry.voiceActor.slug}` : null}
                                />
                    }
                })
            }
        </div>
    )
}

function Relationships({game}:{game : AsobuGame}) {

    return (
        <div>
            <div className="two-column">
                <div id="prequel">
                    {
                        game.prequel ?
                            <RelationMedia 
                                media={game.prequel} 
                                app="miru" 
                                relation="Prequel"
                                link={`/asobu/game/${game.prequel.id}/${game.prequel.slug}`}
                                src={`/storage/asobu/${game.prequel.id}/cover.jpg`}
                            />
                        :
                            <p>No Prequel Found</p>
                    }
                </div>
                <div id="sequel">
                    {
                        game.sequels.length > 0 ?
                            <div className="flex flex-column row-gap-md">
                                {
                                    game.sequels.map((game: AsobuGame, idx: number) => (
                                        <RelationMedia 
                                            key={idx}
                                            media={game} 
                                            app="miru" 
                                            relation="Sequel"
                                            link={`/asobu/game/${game.id}/${game.slug}`}
                                            src={`/storage/asobu/${game.id}/cover.jpg`}
                                        />
                                    ))
                                }
                            </div>
                        :
                            <p>No Sequel Found</p>
                    }
                    
                </div>
            </div>
        </div>
    )
}

function GameFranchise({franchisePromise}:{franchisePromise : Promise<Franchise>}) {
    const franchise = use(franchisePromise)

    return (
        <div id="franchise">
            <Header text="Franchise"/>
            {
                franchise ?
                    <div className="card">
                        <img src={franchise.coverImage} alt={franchise.name} />
                        <div className="mask"></div>
                        <p>{franchise.name}</p>
                    </div>
                :
                    <p>No Franchise found</p>
            }
        </div>
    )
}