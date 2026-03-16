import { notFound } from "next/navigation";

import { AsobuGame } from "@/types/asobu";
import { FetchCharacters, FetchDLC, FetchFranchise, FetchGame } from "./queries";

import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";

import '@/styles/pages/asobu/_game-details.scss';
import Metadata from "./metadata";
import TabWrapper from "./gameTabWrapper";
import Overviewtab from "./(tabs)/overview";
import { Suspense } from "react";
import CharacterCardSkeleton from "@/components/media/characters/characterCardSkeleton";
import CharactersTab from "./(tabs)/characters";
import DLCTab from "./(tabs)/dlc";

export default async function Page(
    props: {
        params: Promise<{id: string, slug: string}>
    }
) {

    const { id, slug } = await props.params;
    const franchisePromise = FetchFranchise(id)
    const characterPromise = FetchCharacters(id)
    const dlcPromise = FetchDLC(id)
    const game = await FetchGame(id);

    if (!game) notFound();


    return (
        <div id="page-game-details" className="page-content media-detail">
            <Hero game={game}/>
            <div id="main-content">
                <Metadata game={game} franchisePromise={franchisePromise} />
                <TabWrapper>
                    <Overviewtab game={game} franchisePromise={franchisePromise} characterPromise={characterPromise}/>
                    <Suspense fallback={<CharacterCardSkeleton />} >
                        <CharactersTab charactersPromise={characterPromise} />
                    </Suspense>
                    <Suspense fallback={<CharacterCardSkeleton />} >
                        <DLCTab dlcPromise={dlcPromise} gameID={id}/>
                    </Suspense>
                </TabWrapper>
            </div>
        </div>
    )
}

function Hero({game}:{game: AsobuGame}) {
    return (
        <div id="hero">
            <SetBreadcrumbs breadcrumbs={['Asobu', 'Game', `${game.title}`]} />
            <div id="synopsis" className="border-radius-md card">
                <img id="hero-image" src={`/storage/asobu/${game.id}/cover.jpg`} />
                <div id="hero-text">
                    <p id="title" className="clr-asobu-base">{game.title}</p>
                    <p id="summary">{game.summary}</p>
                </div>
            </div>
            <div id="latest" className="p-a-md border-radius-md card">
                wip
            </div>
        </div>
    )
}