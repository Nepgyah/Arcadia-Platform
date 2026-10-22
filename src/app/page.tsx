import { Suspense } from "react";

import MediaRow from "./(homepage)/mediaRow";
import { fetchAnimesAction, fetchGamesAction } from "./actions";
import BasicMediaCardLoading from "@/components/cards/media/basicMediaCard/loading";
import SectionHeader from "@/components/layout/sectionHeader";

export default async function Page() {

  const animeListPromise = fetchAnimesAction();
  const gameListPromise = fetchGamesAction()
  
  return (
    <div id="page-home" className="page-content">
      <Suspense fallback={<MediaRowLoading />}>
        <div id="animes">
          <SectionHeader title="Miru Animes" link={{ href: '/asobu/', text: 'See More'}} />
          <MediaRow actionPromise={animeListPromise} app="miru" />
        </div>
      </Suspense>
      <Suspense fallback={<MediaRowLoading />}>
        <div id="animes">
          <SectionHeader title="Asobu Games" link={{ href: '/asobu/', text: 'See More'}} />
          <MediaRow actionPromise={gameListPromise} app="asobu" />
        </div>
      </Suspense>
    </div>
  )
}

function MediaRowLoading() {
  return (
    <div className="media-row grid grid--5 grid--gap-md">
      {
        Array.from({ length: 5}).map((_, idx: number) => (
          <BasicMediaCardLoading key={idx} />
        ))
      }
    </div>
  )
}