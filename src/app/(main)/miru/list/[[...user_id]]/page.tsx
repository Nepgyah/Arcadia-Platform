'use client';

import { useUserStore } from "@/app/store/store";
import Date from "@/components/custom/date";
import Header from "@/components/custom/header";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { Table } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SetBreadcrumbs } from "@/components/navigation/setBreadcrumbs";
export default function Page() {
    const user = useUserStore((state) => state.user)
    const params = useParams<{ user_id: string}>()
    const [watchlist, setWatchlist] = useState<any []>([])
    const [completedList, setCompletedList] = useState([])
    const [planToList, setPlanToList] = useState([])
    const [onHoldList, setOnHoldList] = useState([])
    
    SetBreadcrumbs(['Home', 'Miru', 'Anime', 'List'])
    
    useEffect(() => {
        async function FetchAnimeList() {
            const query = 
            `
            query {
                getAnimeList(userId: ${user ? user.id : params.user_id}) {
                    watching {
                        anime {
                            id,
                            slug,
                            title
                        },
                        score,
                        startWatchDate,
                        endWatchDate
                    },
                    completed {
                        anime {
                            id,
                            slug,
                            title
                        },
                        score,
                        startWatchDate,
                        endWatchDate
                    },
                    planTo {
                        anime {
                            id,
                            slug,
                            title
                        },
                        score,
                        startWatchDate,
                        endWatchDate
                    },
                    onHold {
                        anime {
                            id,
                            slug,
                            title
                        },
                        score,
                        startWatchDate,
                        endWatchDate
                    }
                }
            }
            `

            const results = await arcadiaAPI.GraphQL<any>(query)
            setWatchlist(results.data.getAnimeList.watching)
            setCompletedList(results.data.getAnimeList.completed)
            setPlanToList(results.data.getAnimeList.planTo)
            setOnHoldList(results.data.getAnimeList.onHold)
        }

        if(user) {
            FetchAnimeList()
        }
        
    }, [user])

    return (
        <div id="page-miru-animelist" className="page-content">
            <div>
                <Header text="Watching"/>
                <AnimeList list={watchlist} />
            </div>
            <div>
                <Header text="Completed"/>
                <AnimeList list={completedList} />
            </div>
            <div>
                <Header text="Plan To"/>
                <AnimeList list={planToList} />
            </div>
            <div>
                <Header text="On Hold"/>
                <AnimeList list={onHoldList} />
            </div>
        </div>
    )
}

function AnimeList({list}:{list: any[]}) {
    return (
        <Table.Root size={"lg"} className="arcadia-table">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader width={'50%'}>Title</Table.ColumnHeader>
                    <Table.ColumnHeader>Score</Table.ColumnHeader>
                    <Table.ColumnHeader>Start Date</Table.ColumnHeader>
                    <Table.ColumnHeader>End Date</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    list ?
                        list.length != 0 ?
                            list.map((entry: any, idx: number) => (
                                <Table.Row>
                                    <Table.Cell>
                                        <Link href={`/miru/anime/${entry.anime.id}/${entry.anime.slug}`} className="hover-underline">
                                            {entry.anime.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{entry.score ? entry.score : '--'}</Table.Cell>
                                    <Table.Cell>{entry.startWatchDate ? <Date dateString={entry.startWatchDate}/>  : "--"}</Table.Cell>
                                    <Table.Cell>{entry.endWatchDate ? <Date dateString={entry.endWatchDate}/>  : "--"}</Table.Cell>
                                </Table.Row>
                            ))
                        :
                            <Table.Row>
                                <Table.Cell colSpan={5}> No Anime Here!</Table.Cell>
                            </Table.Row>
                    :
                        <Table.Row>
                            <Table.Cell colSpan={5}>Loading</Table.Cell>
                        </Table.Row>
                }
            </Table.Body>
        </Table.Root>
        

    )
}