import Header from "@/components/custom/header";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

import "@/styles/pages/_voice-actor.scss";

export default async function Page(
    props : {
        params: Promise<{id: string, slug: string}>
    }
) {
    const { id, slug } = await props.params
    const { voiceActor, characters } = await FetchVoiceActor(id)

    return (
        <div id="page-va-details" className="page-content default-schema">
            <div id="two-col">
                <div id="va-metadata">
                    <img className="card border-radius-sm" src={`/storage/voice-actors/${voiceActor.id}.jpg`} alt="" />
                    <div>
                        <div id="name">
                            <p className="txt-lg">{voiceActor.firstName}</p>
                            <p className="bold txt-xxl clr-arc-accent">{voiceActor.lastName}</p>
                        </div>
                        <div id="socials">
                            <Header text="Socials" />

                        </div>
                    </div>
                </div>
                <div id="va-content" className="page-content">
                    <div id="bio-statistics">
                        <div id="bio">
                            <Header text="biography" />
                            <p>{voiceActor.bio}</p>
                        </div>
                        <div id="statistics">
                            <Header text="Arcadia Stats" />
                        </div>
                    </div>
                    <div id="characters">
                        <Header text="Characters" />
                        <div className="container">
                            {
                                characters.map((entry: any, idx: number) => (
                                    <div className="character-card border-radius-sm card">
                                        <img className="character-picture" src={`/storage/characters/${entry.character.id}.jpg`} alt="" />
                                        <div className="names p-a-sm">
                                            <div className="character">
                                                <p>{entry.character.firstName} {entry.character.lastName}</p>
                                                <p>{entry.role}</p>
                                            </div>
                                            <div className="voice-actor">
                                                <p>{entry.anime.title}</p>
                                                <p></p>
                                            </div>
                                        </div>
                                        <img className="voice-actor-picture" src={`/storage/miru/${entry.anime.id}/cover.jpg`} alt=""/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function FetchVoiceActor(id: string) {
    const query = 
    `
    query {
        voiceActorById(id: ${id}) {
            voiceActor {
                id,
                slug,
                firstName,
                lastName,
                bio
            },
            characters {
            anime {
                id,
                slug,
                title
            },
            character {
                id,
                slug,
                firstName,
                lastName
            },
            role
            }
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.voiceActorById
}