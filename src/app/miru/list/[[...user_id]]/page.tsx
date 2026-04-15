'use client';

import Link from "next/link";
import React, { use } from "react";
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
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { FetchAnimeListAction } from "./action";
import { toaster } from "@/components/ui/toaster";
import { AnimeListEntry } from "@/types/miru";
import { CreateErrorToaster } from "@/utils/toasterHelpers/createErrorToaster";

export default function Page({params} : {params : Promise<{ user_id : number}> }) {
    const { user_id } = use(params)
    const user = useUserStore((state) => state.user)
    const [watchlist, setWatchlist] = useState<AnimeListEntry []>([])
    const [completedList, setCompletedList] = useState<AnimeListEntry []>([])
    const [planToList, setPlanToList] = useState<AnimeListEntry []>([])
    const [onHoldList, setOnHoldList] = useState<AnimeListEntry []>([])
    const [username, setUserName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        async function FetchList(targetID : number) {
            const result = await FetchAnimeListAction(targetID)

            if (!result.success) {
                toaster.create({
                    title: result.error,
                    type: 'error'
                })
            } else {
                setWatchlist(result.data.getAnimeList.watching)
                setCompletedList(result.data.getAnimeList.completed)
                setPlanToList(result.data.getAnimeList.planTo)
                setOnHoldList(result.data.getAnimeList.onHold)
                setUserName(result.data.getAnimeList.username)
                setLoading(false)
            }
        }

        if (user != undefined) {
            if (user_id) {
                console.log('Using params')
                const convertedUserID = Number(user_id)
                FetchList(convertedUserID)
            } else if (user) {
                console.log('Using user object')
                FetchList(user.id)
            } else {
                CreateErrorToaster('Cannot find user to search')
            }
        }
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