import Header from "@/components/custom/header"
import CharacterCard from "@/components/media/characters/character-card"
import CharacterCardSkeleton from "@/components/media/characters/characterCardSkeleton"
import RelationMedia from "@/components/media/relation-media"
import { AsobuGame } from "@/types/asobu"
import { Franchise } from "@/types/base"
import { Skeleton, Tag } from "@chakra-ui/react"
import { Suspense, use } from "react"

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
                <div id="summary">
                    <Header text="Summary" />
                    <div id="summary-text" dangerouslySetInnerHTML={{ __html: game.summary }}></div>
                </div>
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

function Characters({charactersPromise}:{charactersPromise : Promise<any[]>}) {
    const characters = use(charactersPromise)
    const mainCharacters = characters.filter((character) => character.role === "Main")

    return (
        <div className="character-container">
            {
                mainCharacters.map((entry: any, idx: number) => {
                    if(idx < 6) {
                        let lSideSrc = (entry.character.coverImgUrl) ? entry.character.coverImgUrl : `/storage/characters/${entry.character.id}.jpg`
                        let rSideSrc = null
    
                        if (entry.character.voiceActor) {
                            if (entry.character.voiceActor.coverImgUrl) {
                                rSideSrc = entry.character.voiceActor.coverImgUrl
                            } else {
                                rSideSrc = `/storage/voice-actors/${entry.character.voiceActor.id}.jpg`
                            }
                        }
                        return <CharacterCard 
                                    key={idx} 
                                    lSideTitle={`${entry.character.firstName} ${entry.character.lastName ? entry.character.lastName : ''}`}
                                    lSideNote={entry.role}
                                    lSideSrc={lSideSrc}
                                    lSideLink={null}
                                    rSideTitle={entry.character.voiceActor ? `${entry.character.voiceActor.firstName} ${entry.character.voiceActor.lastName}` : 'N/A'}
                                    rSideNote="Japanese"
                                    rSideSrc={rSideSrc}
                                    rSideLink={entry.character.voiceActor ? `/voice-actor/${entry.character.voiceActor.id}/${entry.character.voiceActor.slug}` : null}
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