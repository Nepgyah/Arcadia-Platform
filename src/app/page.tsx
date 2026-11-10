import { Suspense } from "react";

import MediaRow from "./(homepage)/mediaRow";
import { fetchAnimesAction, fetchGamesAction } from "./(homepage)/actions";
import BasicMediaCardLoading from "@/components/cards/media/basicMediaCard/loading";
import SectionHeader from "@/components/layout/sectionHeader";

import '@/styles/pages/home.scss'
import { Theme } from "@chakra-ui/react";

export default async function Page() {

  const animeListPromise = fetchAnimesAction();
  const gameListPromise = fetchGamesAction()
  
  return (
    <div id="page-home" className="page-content">
      <GreetingBackground />
      <Suspense fallback={<MediaRowLoading />}>
        <div id="animes">
          <SectionHeader appType="miru" title="Miru Animes" link={{ href: '/asobu/', text: 'See More'}} />
          <MediaRow actionPromise={animeListPromise} app="miru"/>
        </div>
      </Suspense>
      <Suspense fallback={<MediaRowLoading />}>
          <div id="games">
            <SectionHeader appType="asobu" title="Asobu Games" link={{ href: '/asobu/', text: 'See More'}} />
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

function GreetingBackground() {
  const time = new Date().getHours()

  let message = '';

  if (time >= 0 && time < 12) {
        message = "今日もいい天気ですね"
    } else {
        message = "お疲れ様です!"
    }
    return (
      <div id="greeting-image" className="arc-card has-mask">
          <p>{message}</p>
          <div className="mask"></div>
          <img src={`/pages/home/${(time >= 0 && time < 12) ? 'daytime' : 'afternoon'}.jpg`} alt="" />
      </div>
    )
}