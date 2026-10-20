import { Suspense } from "react";

import MediaRow from "./(homepage)/mediaRow";
import { fetchAnimesAction, fetchGamesAction } from "./actions";

export default async function Page() {

  const animeListPromise = fetchAnimesAction();
  const gameListPromise = fetchGamesAction()
  
  return (
    <div id="page-home">
      <Suspense fallback={<div>Loading...</div>}>
        <MediaRow actionPromise={animeListPromise} app="miru" />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <MediaRow actionPromise={gameListPromise} app="asobu" />
      </Suspense>
    </div>
  )
}