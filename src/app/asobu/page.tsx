import Header from "@/components/custom/header";
import SimpleMediaCard from "@/components/media/simpleCard/simpleMediaCard";
import SimpleMediaCardSkeleton from "@/components/media/simpleCard/simpleMediaCardSkeleton";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import { AsobuGame } from "@/types/asobu";
import { Suspense, use } from "react";

import '@/styles/pages/asobu/_home.scss';
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

export default function Page() {

    const topGamesPromise = FetchTopGames();
    const popularGamesPromise = FetchPopularGames();
    
    return (
        <div id="page-asobu-home" className="page-content">
            <SetBreadcrumbs breadcrumbs={['Asobu', 'Home']} />
           <div id="anime-lists" className="flex flex-column row-gap-md">
                <div id="score">
                    <Header text="Highest Rated" />
                    <Suspense fallback={<GameListSkeleton />}>
                        <GameList gamePromise={topGamesPromise} />
                    </Suspense>
                </div>
                <div id="popular">
                    <Header text="Most Popular" />
                    <Suspense fallback={<GameListSkeleton />}>
                        <GameList gamePromise={popularGamesPromise} />
                    </Suspense>
                </div>
            </div>
            <div id="friend-activity">
                WIP
            </div>
        </div>
    )
}

function GameList({gamePromise}:{gamePromise: Promise<any>}) {
    const games = use(gamePromise)

    return (
        <div className="container">
            {
                games.map((game: AsobuGame, idx: number) => (
                    <SimpleMediaCard 
                        key={idx} app="miru" 
                        title={game.title} 
                        id={game.id} 
                        imagePath={`/storage/asobu/${game.id}/cover.jpg`}
                        href={`asobu/game/${game.id}/${game.slug}`}
                    />
                )) 
            }
        </div>
    )
}

function GameListSkeleton() {
    return (
        <div className="container">
        {
            Array.from({length: 5}).map((_, idx) => (
                <SimpleMediaCardSkeleton key={idx} />
            ))
        }
        </div>
    )
}

async function FetchTopGames() {
    const query = 
    `
    query {
        gamesByCategory(category: "-score", count: 5) {
            id,
            slug,
            title,
            score,
            users
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query);
    return response.data.gamesByCategory
}

async function FetchPopularGames() {
    const query = 
    `
    query {
        gamesByCategory(category: "-users", count: 5) {
            id,
            slug,
            title,
            score,
            users
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query);
    return response.data.gamesByCategory
}