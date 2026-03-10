export const dynamic = "force-dynamic";

import Header from "@/components/custom/header";
import RelationMedia from "@/components/media/relation-media";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";

import '@/styles/pages/_home.scss';
import { Media } from "@/types/base";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

export default async function Home() {
    const animeList = await FetchAnime()
    return (
        <div id="page-home" className="page-content">
            <SetBreadcrumbs breadcrumbs={['Home']} />
            <GreetingImage />
            <div id="app-overview">
                <div id="miru" className="flex flex-column row-gap-md">
                    <Header text="Miru" />
                    {
                        animeList.map((media: Media, idx: number) => (
                            <RelationMedia 
                                app='miru'
                                media={media}
                                src={`/storage/miru/${media.id}/cover.jpg`}
                                link={`/miru/anime/${media.id}/${media.slug}`}
                                relation=""
                            />
                        ))
                    }
                </div>
                <div id="yomu" className="flex flex-column row-gap-md">
                    <Header text="Yomu" />
                    <p>App under construction</p>
                </div>
                <div id="asobu" className="flex flex-column row-gap-md">
                    <Header text="Asobu" />
                    <p>App under construction</p>
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
            slug
        }
    }
    `
    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.animeByCategory
}