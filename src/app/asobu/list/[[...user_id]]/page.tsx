'use client';

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Table, Tabs } from "@chakra-ui/react";

import { FetchUserGameList } from "./action";
import { useUserStore } from "@/app/store/store";
import { GameListEntry } from "@/types/asobu";

import Date from "@/components/custom/date";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import StatCardSkeleton from "@/components/custom/stat-card/statCardSkeleton";
import StatCard from "@/components/custom/stat-card/statCard";
import { CreateErrorToaster } from "@/utils/toasterHelpers/createErrorToaster";
import { CalendarClock, CheckCheck, GamepadDirectional, RotateCcw, SquarePause } from "lucide-react";
import React from "react";

import '@/styles/pages/asobu/_gamelist.scss';
import TableSkeleton from "@/components/custom/tableSkeleton";

interface GameLists {
    playing: GameListEntry[],
    complete: GameListEntry[],
    planTo: GameListEntry[],
    onHold: GameListEntry[],
    replaying: GameListEntry[]
}
export default function Page(
    { 
        params 
    } : {
        params: Promise<{ user_id : number}>
    }
) {
    const { user_id } = use(params);
    const user = useUserStore((state) => state.user );

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('Loading')
    const [gameLists, setGameLists] = useState<GameLists>(
        {
            playing: [],
            complete: [],
            planTo: [],
            onHold: [],
            replaying: []
        }
    )
    const [playList, setPlayList] = useState<GameListEntry[]>([])
    const [completeList, setCompleteList] = useState<GameListEntry[]>([])
    const [planToList, setPlanToList] = useState<GameListEntry[]>([])
    const [onHoldList, setOnHoldList] = useState<GameListEntry[]>([])
    const [replayList, setReplayList] = useState<GameListEntry[]>([])

    useEffect(() => {
        if (user != undefined) {
            if (user_id) {
                FetchListData(Number(user_id))
            } else if (user) {
                FetchListData(user.id)
            } else {
                CreateErrorToaster('Cannot find target user')
            }
        }
    }, [user])

    async function FetchListData(user_id: number) {
        const result = await FetchUserGameList(user_id)

        if (result.success) {
            setUsername(result.data.userGameList.username)
            setGameLists({
                playing: result.data.userGameList.playing,
                complete: result.data.userGameList.completed,
                planTo: result.data.userGameList.planTo,
                onHold: result.data.userGameList.onHold,
                replaying: result.data.userGameList.replaying
            })
            setIsLoading(false)
        } else {
            CreateErrorToaster(result.error)
        }
    }
    return (
        <div id="page-asobu-gamelist" className="page-content">
            {
                !isLoading &&
                    <SetBreadcrumbs breadcrumbs={['Asobu', 'List', `${username}'s game list`]} /> 
            }
            <div id="gamelist-stats">
                <Statistics
                    isLoading={isLoading}
                    counts={{
                        playing: gameLists.playing.length,
                        completed: gameLists.complete.length,
                        planTo: gameLists.planTo.length,
                        onHold: gameLists.onHold.length,
                        replaying: gameLists.replaying.length
                    }}
                />
            </div>
            <Tabs.Root defaultValue='playing'>
                <Tabs.List>
                    <Tabs.Trigger value="playing">
                        <GamepadDirectional />
                        Playing
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
                    <Tabs.Trigger value="replaying">
                        <RotateCcw />
                        Replaying
                    </Tabs.Trigger>
                    <Tabs.Indicator />
                </Tabs.List>
                {
                    isLoading ?
                        <TableSkeleton />
                    :
                        <React.Fragment>
                            <Tabs.Content value="playing">
                                <GameList list={gameLists.playing} />   
                            </Tabs.Content>
                            <Tabs.Content value="completed">
                                <GameList list={gameLists.complete} />   
                            </Tabs.Content>
                            <Tabs.Content value="planTo">
                                <GameList list={gameLists.planTo} />   
                            </Tabs.Content>
                            <Tabs.Content value="onHold">
                                <GameList list={gameLists.onHold} />   
                            </Tabs.Content>
                            <Tabs.Content value="replaying">
                                <GameList list={gameLists.replaying} />   
                            </Tabs.Content>
                        </React.Fragment>
                }
            </Tabs.Root>
        </div>
    )
}

interface StatisticsProps {
    isLoading: boolean,
    counts: {
        playing: number,
        completed: number,
        planTo: number,
        onHold: number,
        replaying: number
    }

}

function Statistics({isLoading, counts} : StatisticsProps) {
    if (isLoading) {
       return (
            Array.from({length: 5}).map((_, idx) => (
                <StatCardSkeleton key={idx} />
            ))
       )
    } else {
        return (
            <>
                <StatCard 
                    icon={GamepadDirectional} 
                    label="Playing"
                    value={counts.playing}
                />
                <StatCard 
                    icon={CheckCheck} 
                    label="Completed"
                    value={counts.completed}
                />
                <StatCard 
                    icon={CalendarClock} 
                    label="Plan To"
                    value={counts.planTo}
                />
                <StatCard 
                    icon={SquarePause} 
                    label="On Hold"
                    value={counts.onHold}
                />
                <StatCard 
                    icon={RotateCcw} 
                    label="Replyaing"
                    value={counts.replaying}
                />
            </>
        )
    }
}


function GameList({list} : {list:GameListEntry[]}) {
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
                                list.map((entry: GameListEntry, idx: number) => (
                                    <Table.Row key={idx}>
                                        <Table.Cell>
                                            {idx + 1}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link href={`/asobu/game/${entry.game.id}/${entry.game.slug}`} className="hover-underline">
                                                {entry.game.title}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>{entry.score ? entry.score : '--'}</Table.Cell>
                                        <Table.Cell>{entry.startPlayDate ? <Date dateString={entry.startPlayDate}/>  : "--"}</Table.Cell>
                                        <Table.Cell>{entry.endPlayDate ? <Date dateString={entry.endPlayDate}/>  : "--"}</Table.Cell>
                                    </Table.Row>
                                ))
                            :
                                <Table.Row>
                                    <Table.Cell colSpan={5}> No Games Here!</Table.Cell>
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