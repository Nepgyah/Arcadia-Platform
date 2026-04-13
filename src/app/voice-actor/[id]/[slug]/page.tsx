export const revalidate = 60;

import Header from "@/components/custom/header";

import CharacterCard from "@/components/media/characters/character-card";
import SocialsList from "@/components/media/socials/socials";

import "@/styles/pages/_voice-actor.scss";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";

export default async function Page(
    props : {
        params: Promise<{id: string, slug: string}>
    }
) {
    const { id, slug } = await props.params
    const { voiceActor, relatedAnime, relatedGames } = await FetchVoiceActor(id)

    return (
        <div id="page-va-details" className="page-content default-schema">
            <div id="two-col">
                <div id="va-metadata">
                    <img id="va-photo" className="card border-radius-sm" src={voiceActor.coverImgUrl ? voiceActor.coverImgUrl : `/storage/voice-actors/${voiceActor.id}.jpg`} alt="" />
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
                    <div className="characters">
                        <Header text="Anime Works" />
                        <div className="container">
                            {
                                relatedAnime.length ? 
                                    relatedAnime.map((entry: any, idx: number) => {
                                        let lSideSrc = (entry.character.coverImgUrl) ? entry.character.coverImgUrl : `/storage/characters/${entry.character.id}.jpg`
                                        let rSideSrc = (entry.anime.coverImgUrl) ? entry.anime.coverImgUrl : `/storage/anime/${entry.anime.id}/cover.jpg`
                                        return (
                                            
                                            <CharacterCard 
                                                    key={idx} 
                                                    lSideTitle={entry.character.fullName}
                                                    lSideNote={entry.role}
                                                    lSideSrc={lSideSrc}
                                                    lSideLink={null}
                                                    rSideTitle={`${entry.anime.title}`}
                                                    rSideNote=""
                                                    rSideSrc={rSideSrc}
                                                    rSideLink={`/miru/anime/${entry.anime.id}/${entry.anime.slug}`}
                                                />
                                        )
                                    })
                                :
                                    <p>No related anime</p>
                            }
                        </div>
                    </div>
                    <div className="characters">
                        <Header text="Game Works" />
                        <div className="container">
                            {
                                relatedGames.length ? 
                                    relatedGames.map((entry: any, idx: number) => (
                                    <CharacterCard 
                                            key={idx} 
                                            lSideTitle={`${entry.character.firstName} ${entry.character.lastName != null ? entry.character.lastName : ''}`}
                                            lSideNote={entry.role}
                                            lSideSrc={`/storage/characters/${entry.character.id}.jpg`}
                                            lSideLink={null}
                                            rSideTitle={`${entry.game.title}`}
                                            rSideNote="Game"
                                            rSideSrc={`/storage/asobu/${entry.game.id}/cover.jpg`}
                                            rSideLink={`/asobu/game/${entry.game.id}/${entry.game.slug}`}
                                        />
                                ))
                                :
                                    <p>No related games</p>
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
        voiceActorById(vaId: ${id}) {
            voiceActor {
                id,
                slug,
                firstName,
                lastName,
                bio,
                socials,
                coverImgUrl
            },
            relatedAnime {
                anime {
                    id,
                    slug,
                    title,
                    coverImgUrl
                },
                character {
                    id,
                    slug,
                    fullName,
                    coverImgUrl
                },
                role
            },
            relatedGames {
                role,
                isPlayable,
                game {
                    id,
                    slug,
                    title,
                },
                character {
                    id,
                    slug,
                    firstName,
                    lastName,
                    coverImgUrl
                }
            }
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<any>(query)
    return response.data.voiceActorById
}