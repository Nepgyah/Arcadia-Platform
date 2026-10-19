import { Suspense } from "react";

import MediaRow from "./(homepage)/mediaRow";
import { fetchAnimesAction, fetchGamesAction } from "./actions";

export default async function Page() {

  const animeListPromise = fetchAnimesAction();
  const gameListPromise = fetchGamesAction()
  
  return (
    <div id="page-home">
      <Suspense fallback={<div>Loading...</div>}>
        <MediaRow actionPromise={animeListPromise} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <MediaRow actionPromise={gameListPromise} />
      </Suspense>
    </div>
  )
}