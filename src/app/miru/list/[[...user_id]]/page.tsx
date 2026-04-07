'use client';

import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { notFound, redirect, useParams } from "next/navigation";

import { Table, Tabs } from "@chakra-ui/react";
import { Binoculars, CheckCheck, CalendarClock, SquarePause } from "lucide-react";
import Date from "@/components/custom/date";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import { useUserStore } from "@/app/store/store";

import StatCard from "@/components/custom/stat-card/statCard";

import '@/styles/pages/miru/_anilist.scss';
import StatCardSkeleton from "@/components/custom/stat-card/statCardSkeleton";
import { arcadiaClientFetch } from "@/utils/api/arcadia/arcadiaClient";

export default function Page() {
    const user = useUserStore((state) => state.user)
    const params = useParams<{ user_id: string}>()
    const [watchlist, setWatchlist] = useState<any []>([])
    const [completedList, setCompletedList] = useState([])
    const [planToList, setPlanToList] = useState([])
    const [onHoldList, setOnHoldList] = useState([])
    const [username, setUserName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        async function FetchAnimeList() {
            const query = 
            `
            query {
                getAnimeList(userId: ${params.user_id ? params.user_id: user.id}) {
                    username,
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

            const results = await arcadiaClientFetch.GraphQL<any>(query)
            if (!results.data.getAnimeList) {
                redirect('/not-found')
            }
            setWatchlist(results.data.getAnimeList.watching)
            setCompletedList(results.data.getAnimeList.completed)
            setPlanToList(results.data.getAnimeList.planTo)
            setOnHoldList(results.data.getAnimeList.onHold)
            setUserName(results.data.getAnimeList.username)
            setLoading(false)
        }

        FetchAnimeList()
    }, [user])

    return (
        <div id="page-miru-animelist" className="page-content">
            <div id="anilist-stats">
                {
                    loading ?
                        Array.from({length: 4}).map((_, idx) => (
                            <StatCardSkeleton key={idx} />
                        ))
                    :
                        <>
                            <StatCard 
                                icon={Binoculars} 
                                label="Watching"
                                value={watchlist.length}
                            />
                            <StatCard 
                                icon={CheckCheck} 
                                label="Completed"
                                value={completedList.length}
                            />
                            <StatCard 
                                icon={CalendarClock} 
                                label="Plan To"
                                value={planToList.length}
                            />
                            <StatCard 
                                icon={SquarePause} 
                                label="On Hold"
                                value={onHoldList.length}
                            />
                        </>
                }
            </div>
            <Tabs.Root defaultValue='watching'>
                <Tabs.List>
                    <Tabs.Trigger value="watching">
                        <Binoculars />
                        Watching
                    </Tabs.Trigger>
                    <Tabs.Trigger value="completed">
                        <CheckCheck />
                        Completed
                    </Tabs.Trigger>
                    <Tabs.Trigger value="planTo">
                        <CalendarClock />
                        Plan To
                    </Tabs.Trigger>
                    <Tabs.Trigger value="onHold">
                        <SquarePause />
                        On Hold
                    </Tabs.Trigger>
                    <Tabs.Indicator />
                </Tabs.List>
                {
                    loading ?
                        <p>Loading</p>
                    :
                        <React.Fragment>
                            <SetBreadcrumbs breadcrumbs={['Miru', 'Anilist', `${username}'s Anilist`]} />
                            <Tabs.Content value="watching">
                                <AnimeList list={watchlist} />
                            </Tabs.Content>
                            <Tabs.Content value="completed">
                                <AnimeList list={completedList} />
                            </Tabs.Content>
                            <Tabs.Content value="planTo">
                                <AnimeList list={planToList} />
                            </Tabs.Content>
                            <Tabs.Content value="onHold">
                                <AnimeList list={onHoldList} />
                            </Tabs.Content>
                        </React.Fragment>
                }
            </Tabs.Root>
        </div>
    )
}

function AnimeList({list}:{list: any[]}) {
    return (
        <Table.ScrollArea>
            <Table.Root size={"lg"} className="arcadia-table">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>#</Table.ColumnHeader>
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
                                    <Table.Row key={idx}>
                                        <Table.Cell>
                                            {idx + 1}
                                        </Table.Cell>
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
        </Table.ScrollArea>

    )
}