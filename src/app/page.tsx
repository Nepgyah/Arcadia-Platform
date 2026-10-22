import { Suspense } from "react";

import MediaRow from "./(homepage)/mediaRow";
import { fetchAnimesAction, fetchGamesAction } from "./actions";
import BasicMediaCardLoading from "@/components/cards/media/basicMediaCard/loading";

export default async function Page() {

  const animeListPromise = fetchAnimesAction();
  const gameListPromise = fetchGamesAction()
  
  return (
    <div id="page-home">
      <Suspense fallback={<MediaRowLoading />}>
        <MediaRow actionPromise={animeListPromise} app="miru" />
      </Suspense>
      <Suspense fallback={<MediaRowLoading />}>
        <MediaRow actionPromise={gameListPromise} app="asobu" />
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