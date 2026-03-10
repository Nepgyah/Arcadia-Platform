import Header from "@/components/custom/header";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

export default async function Page(
    props : {
        params: Promise<{id: string, slug: string}>
    }
) {
    const { id, slug } = await props.params
    const voiceActorPromise = FetchVoiceActor(id)

    return (
        <div id="page-va-details" className="page-content">
            <div id="two-col">
                <div id="va-metadata">
                    <img src="" alt="" />
                    <div id="socials">
                        <Header text="Socials" />

                    </div>
                </div>
                <div id="va-content">
                    <div id="bio-statistics">
                        <div id="bio">
                            <Header text="biography" />
                        </div>
                        <div id="statistics">
                            <Header text="Arcadia Stats" />
                        </div>
                    </div>
                    <div id="characters">
                        <Header text="Characters" />
                    </div>
                </div>
            </div>
        </div>
    )
}

async function FetchVoiceActor(id: string) {
    const query = 
    `
    `

    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data
}