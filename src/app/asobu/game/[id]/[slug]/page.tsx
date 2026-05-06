export const revalidate = 60;

import React from "react";
import { Suspense, use } from "react";
import { notFound } from "next/navigation";
import { Sparkles, UserPlus } from "lucide-react";

import { AsobuGame } from "@/types/asobu";

import { Franchise } from "@/types/base";
import SetBreadcrumbs from "@/components/shared/breadcrumbs/setBreadcrumbs";
import CharacterCardSkeleton from "@/components/shared/characters/characterCardSkeleton";
import Header from "@/components/ui/headers/header";

import Metadata from "./metadata";
import TabWrapper from "./gameTabWrapper";
import CharactersTab from "./(tabs)/characters";
import DLCTab from "./(tabs)/dlc";
import Overviewtab from "./(tabs)/overview";
import { FetchCharacters, FetchDLC, FetchFranchise, FetchGame, FetchReviews } from "./queries";
import '@/styles/pages/asobu/_game-details.scss';
import ReviewTab from "./(tabs)/reviews";

export default async function Page(
    props: {
        params: Promise<{id: string, slug: string}>
    }
) {

    const { id, slug } = await props.params;
    const franchisePromise = FetchFranchise(id)
    const characterPromise = FetchCharacters(id)
    const dlcPromise = FetchDLC(id)
    const reviews = FetchReviews(id)
    const game = await FetchGame(id);
    if (!game) notFound();


    return (
        <div id="page-game-details" className="page-content media-detail">
            <Hero game={game}/>
            <div id="main-content">
                <Metadata game={game} franchisePromise={franchisePromise} />
                <div>
                    <div id="ranks-franchise" className="two-column">
                        <Ranks game={game} />
                        <GameFranchise franchisePromise={franchisePromise} />
                    </div>
                    <TabWrapper>
                        <Overviewtab game={game} franchisePromise={franchisePromise} characterPromise={characterPromise}/>
                        <Suspense fallback={<CharacterCardSkeleton />} >
                            <CharactersTab charactersPromise={characterPromise} />
                        </Suspense>
                        <Suspense fallback={<CharacterCardSkeleton />} >
                            <DLCTab dlcPromise={dlcPromise} gameID={id}/>
                        </Suspense>
                        <Suspense fallback={<CharacterCardSkeleton />}>
                            <ReviewTab reviewPromise={reviews} />
                        </Suspense>
                    </TabWrapper>
                </div>
            </div>
        </div>
    )
}

function Hero({game}:{game: AsobuGame}) {
    return (
        <React.Fragment>
            <SetBreadcrumbs breadcrumbs={['Asobu', 'Game', `${game.title}`]} />
            <div id="hero" className="border-radius-md card">
                <div className="mask"></div>
                <img id="hero-image" src={`/storage/asobu/${game.id}/banner.jpg`} />
                <div id="titles">
                    <p className="clr-asobu-base txt-xxl">{game.title}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

function Ranks({game}:{game:AsobuGame}) {
    return (
        <div id="ranks">
            <Header text="Rankings" />
            <div id="rank-container">
                <div className="rank card">
                    <UserPlus />
                    <p>Users: {game.users}</p>
                </div>
                <div className="rank card">
                    <Sparkles />
                    <p>Score: {game.score}</p>
                </div>
                <div className="rank card">
                   <img src="/icons/steam-logo.svg" alt="" />
                   <p>Steam Score: WiP</p>
                </div>
                <div className="rank card">
                    TDB
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