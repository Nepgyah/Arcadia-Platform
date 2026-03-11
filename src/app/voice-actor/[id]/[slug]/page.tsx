export const revalidate = 60;

import Header from "@/components/custom/header";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

import "@/styles/pages/_voice-actor.scss";
import CharacterCard from "@/components/media/characters/character-card";
import SocialsList from "@/components/media/socials/socials";

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
                    <img id="va-photo" className="card border-radius-sm" src={`/storage/voice-actors/${voiceActor.id}.jpg`} alt="" />
                    <div>
                        <div id="name">
                            <p className="txt-lg">{voiceActor.firstName}</p>
                            <p className="bold txt-xxl clr-arc-accent">{voiceActor.lastName}</p>
                        </div>
                        <div id="socials">
                            <Header text="Socials" />
                            {
                                voiceActor.socials ?
                                    <SocialsList socials={voiceActor.socials} />
                                :
                                    <p>No socials found</p>
                            }
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
                            <p>Work in Progress</p>
                        </div>
                    </div>
                    <div id="characters">
                        <Header text="Characters" />
                        <div className="container">
                            {
                                characters.map((entry: any, idx: number) => (
                                    <CharacterCard 
                                            key={idx} 
                                            lSideTitle={`${entry.character.firstName} ${entry.character.lastName != null ? entry.character.lastName : ''}`}
                                            lSideNote={entry.role}
                                            lSideSrc={`/storage/characters/${entry.character.id}.jpg`}
                                            lSideLink={null}
                                            rSideTitle={`${entry.anime.title}`}
                                            rSideNote=""
                                            rSideSrc={`/storage/miru/${entry.anime.id}/cover.jpg`}
                                            rSideLink={`/miru/anime/${entry.anime.id}/${entry.anime.slug}`}
                                        />
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
                bio,
                socials
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