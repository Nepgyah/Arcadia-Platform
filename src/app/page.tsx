export const dynamic = "force-dynamic";

import Header from "@/components/custom/header";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";

import { Media } from "@/types/base";

import '@/styles/pages/_home.scss';
import SimpleMediaCard from "@/components/media/simpleCard/simpleMediaCard";
import LinkedHeader from "@/components/custom/linkedHeader";
import { Anime } from "@/types/miru";
import { arcadiaServerFetch } from "@/utils/api/arcadia/arcadiaServer";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

export default async function Home() {
    const animeList = await FetchAnime()
    const gamesList = await FetchGames()

    return (
        <div id="page-home" className="page-content">
            <SetBreadcrumbs breadcrumbs={['Home']} />
            <GreetingImage />
            <div id="app-overview">
                <div id="miru">
                    <LinkedHeader text="Miru" href="/miru/all-time" linkText="See all" />
                    <div className="container">
                        {
                            animeList &&
                            animeList.map((media: Anime, idx: number) => (
                                <SimpleMediaCard 
                                    key={idx}
                                    id={media.id}
                                    app='miru'
                                    title={media.title}
                                    imagePath={media.coverImgUrl ? media.coverImgUrl : `/storage/miru/${media.id}/cover.jpg`}
                                    href={`miru/anime/${media.id}/${media.slug}`}
                                />
                            ))
                        }
                    </div>
                </div>
                <div id="yomu" >
                    <Header text="Yomu" />
                    <p>App under construction</p>
                </div>
                <div id="asobu">
                    <Header text="Asobu" />
                    <div className="container">
                        {
                            gamesList && 
                            gamesList.map((media: Media, idx: number) => (
                                <SimpleMediaCard 
                                    key={idx}
                                    id={media.id}
                                    app='asobu'
                                    title={media.title}
                                    imagePath={`/storage/asobu/${media.id}/cover.jpg`}
                                    href={`asobu/game/${media.id}/${media.slug}`}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function GreetingImage() {
    const time = new Date().getHours()
    let message =""
    
    if (time >= 0 && time < 12) {
        message = "今日もいい天気ですね"
    } else {
        message = "お疲れ様でした!"
    }
    return (
        <div id="greeting-image" className="card">
            <p className="bold">{message}</p>
            <div className="mask"></div>
            <img src={`/pages/home/${(time >= 0 && time < 12) ? 'daytime' : 'afternoon'}.jpg`} alt="" />
        </div>
    )
}

async function FetchAnime() {
    const query = 
    `
    query {
        animeByCategory(category: "score", count: 5) {
            id,
            title,
            slug,
            coverImgUrl
        }
    }
    `
    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.animeByCategory
}

async function FetchGames() {
    const query = 
    `
    query {
        gamesByCategory(category: "-score", count: 5) {
            id,
            title,
            slug
        }
    }
    `
    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.gamesByCategory
}