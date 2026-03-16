import Header from "@/components/custom/header"
import CharacterCard from "@/components/media/characters/character-card"
import CharacterCardSkeleton from "@/components/media/characters/characterCardSkeleton"
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
            <div id="genres-franchise" className="two-column">
                <Genres game={game} />
                <Suspense fallback={<Skeleton height="200px" width={'100%'}/>}>
                    <GameFranchise franchisePromise={franchisePromise} />
                </Suspense>
            </div>
            <div id="overview-characters">
                <Header text="Characters" />
                <Suspense fallback={<CharacterCardSkeleton />}>
                    <Characters charactersPromise={characterPromise} />
                </Suspense>
            </div>
        </div>
    )
}

function Genres({game}:{game : AsobuGame}) {

    return (
        <div id="overview-genres">
            <Header text="Genres"/>
            <div className="flex flex-wrap flex-gap-sm">
                {
                    game.genres.map((genre: any, idx: number) => (
                        <Tag.Root key={idx} size={'xl'} className="card bg-asobu-base clr-txt-white">
                            <Tag.Label>{genre.name}</Tag.Label>
                        </Tag.Root>
                    ))
                }
            </div>
        </div>
    )
}

function GameFranchise({franchisePromise}:{franchisePromise : Promise<Franchise>}) {
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
                                    lSideTitle={`${entry.character.firstName} ${entry.character.lastName}`}
                                    lSideNote={entry.role}
                                    lSideSrc={`/storage/characters/${entry.character.id}.jpg`}
                                    lSideLink={null}
                                    rSideTitle={entry.character.voiceActor ? `${entry.character.voiceActor.firstName} ${entry.character.voiceActor.lastName}` : 'N/A'}
                                    rSideNote="Japanese"
                                    rSideSrc={entry.character.voiceActor ? `/storage/voice-actors/${entry.character.voiceActor.id}.jpg` : '/'}
                                    rSideLink={entry.character.voiceActor ? `/voice-actor/${entry.character.voiceActor.id}/${entry.character.voiceActor.slug}` : null}
                                />
                    }
                })
            }
        </div>
    )
}