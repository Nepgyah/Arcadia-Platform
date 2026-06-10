export const revalidate = 60;

import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import Header from "@/components/ui/headers/header";
import RelatedMedia from "@/components/shared/relation-media";
import SocialsList from "@/components/shared/socials/socials";
import "@/styles/pages/_voice-actor.scss";
import { number } from "zod";
import TabWrapper from "./tab";

export default async function Page(
    props : {
        params: Promise<{id: string, slug: string}>
    }
) {
    const { id, slug } = await props.params
    const { voiceActor, animeRoles, gameRoles } = await FetchVoiceActor(Number(id))

    return (
        <div id="page-va-details" className="page-content default-schema">
            <div id="two-col">
                <div id="va-metadata">
                    <img id="va-photo" className="card border-radius-sm" src={voiceActor.coverImageUrl ? voiceActor.coverImageUrl : `/person-not-found.jpg`} alt="" />
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
                    <div className="overview">
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
                    </div>
                    <TabWrapper>
                        <div className="characters">
                            <Header text="Anime Works" />
                            <div className="container">
                                {
                                    animeRoles.length ?
                                        <MediaRoles mediaRoles={animeRoles} type="anime" />
                                    :
                                        <p>No Anime roles found</p>
                                }
                            </div>
                        </div>
                        <div className="characters">
                            <Header text="Game Works" />
                            <div className="container">
                                {
                                    gameRoles.length ?
                                        <MediaRoles mediaRoles={gameRoles} type="game" />
                                    :
                                        <p>No Game roles found</p>
                                }
                            </div>
                        </div>
                    </TabWrapper>
                </div>
            </div>
        </div>
    )
}

function MediaRoles(
    {
        mediaRoles,
        type
    } : {
        mediaRoles: any,
        type: "anime" | "game"
    }) {
    return (
        <>
        {
            mediaRoles.map((entry: any, idx: number) => (
                <div key={idx} className="character-details p-b-sm">
                    <div className="character-overview">
                        <img className="border-radius-md shadow" src={entry.character.coverImageUrl} alt="" />
                        <p className="m-t-sm">{entry.character.fullName}</p>
                    </div>
                    <div className="appearances">
                        {
                            entry.appearances.map((appearance: any, idx: number) => (
                                <RelatedMedia 
                                    key={idx}
                                    app="miru"
                                    media={type == "anime" ? appearance.anime : appearance.game}
                                    relation={appearance.role}
                                    link={
                                        type == "anime" ?
                                            `/miru/anime/${appearance.anime.id}/${appearance.anime.slug}`
                                        :
                                            `/asobu/game/${appearance.game.id}/${appearance.game.slug}`
                                    }
                                    src={type == "anime" ? appearance.anime.coverImageUrl : appearance.game.coverImageUrl}
                                />
                            ))
                        }
                    </div>
                </div>
            ))
        }
        </>
    )
}
async function FetchVoiceActor(id: number) {
    const query = 
    `
    query ($vaID: Int!) {
        talent {
            voiceActor(pk: $vaID) {
                id,
                slug,
                firstName,
                lastName,
                bio,
                socials,
                coverImageUrl
            }
        },
        miru {
            animeRoles(voiceActorId: $vaID) {
                character {
                    id,
                    fullName,
                    coverImageUrl
                },
                appearances {
                    anime {
                        id,
                        slug
                        title
                        coverImageUrl
                    },
                    role
                }
            }
        },
        asobu {
            gameRoles(voiceActorId: $vaID) {
                character {
                    id,
                    fullName,
                    coverImageUrl
                },
                appearances {
                    game {
                        id,
                        slug
                        title,
                        coverImageUrl
                    },
                    role
                }
            }
        }
    }
    `
    const variables = { vaID: id}
    const response = await arcadiaAPI.GraphQL<any>(query, variables)
    return {
        "voiceActor": response.data.talent.voiceActor,
        "animeRoles": response.data.miru.animeRoles,
        "gameRoles": response.data.asobu.gameRoles
    }
}