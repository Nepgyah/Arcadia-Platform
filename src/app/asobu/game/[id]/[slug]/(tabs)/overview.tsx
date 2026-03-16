import Header from "@/components/custom/header"
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