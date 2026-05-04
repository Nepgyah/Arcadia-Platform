'use client';

import Link from "next/link";
import { createContext, use, useContext, useEffect, useState } from "react";
import { Button, Dialog, IconButton, Portal, Table, Tabs } from "@chakra-ui/react";

import { DeleteUserListEntry, FetchUserGameList } from "./action";
import { useUserStore } from "@/app/store/store";
import { GameListEntry, GameListEntryStatus } from "@/types/asobu";

import Date from "@/components/custom/date";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import StatCardSkeleton from "@/components/custom/stat-card/statCardSkeleton";
import StatCard from "@/components/custom/stat-card/statCard";
import { CreateErrorToaster, CreateSuccessToaster } from "@/utils/toasterHelpers";
import { CalendarClock, CheckCheck, GamepadDirectional, RotateCcw, SquarePause, Trash2 } from "lucide-react";
import React from "react";

import TableSkeleton from "@/components/custom/tableSkeleton";
import LoginRequired from "@/components/custom/loginRequired";

import '@/styles/pages/asobu/_gamelist.scss';

const IDContext = createContext(-1)

interface GameLists {
    playing: GameListEntry[],
    completed: GameListEntry[],
    planTo: GameListEntry[],
    onHold: GameListEntry[],
    replaying: GameListEntry[]
}
export default function Page(
    { 
        params 
    } : {
        params: Promise<{ paramID : number}>
    }
) {
    const { paramID } = use(params);
    const user = useUserStore((state) => state.user );

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('Loading')
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
    const [gameLists, setGameLists] = useState<GameLists>(
        {
            playing: [],
            completed: [],
            planTo: [],
            onHold: [],
            replaying: []
        }
    )

    const [selectedInput, setSelectedInput] = useState<
    {
        entryID: number,
        listType: GameListEntryStatus  
    } | null>(null)

    useEffect(() => {
        if (user !== undefined) {
            if (paramID) {
                FetchListData(Number(paramID))
            } else if (user) {
                FetchListData(user.id)
            } else {
                CreateErrorToaster('Cannot find target user')
                setShowLogin(true)
            }
        }
    }, [user])

    async function FetchListData(user_id: number) {
        const result = await FetchUserGameList(user_id)

        if (result.success) {
            setUsername(result.data.userGameList.username)
            setGameLists({
                playing: result.data.userGameList.playing,
                completed: result.data.userGameList.completed,
                planTo: result.data.userGameList.planTo,
                onHold: result.data.userGameList.onHold,
                replaying: result.data.userGameList.replaying
            })
            console.log('Done')
            setIsLoading(false)
        } else {
            CreateErrorToaster(result.error)
        }
    }

    const handleOpenPopup = (listType: GameListEntryStatus, entryID: number) => {
        setIsPopupOpen(true)
        setSelectedInput({
            entryID: entryID,
            listType: listType
        })
    }

    async function handleDeleteEntry() {
        switch(selectedInput?.listType) {
            case 'playing': {
                break;
            }
            case 'completed': {
                let result = gameLists.completed.filter(item => item.id !== selectedInput.entryID)
                let temp = {
                    playing: gameLists.playing,
                    completed: result,
                    onHold: gameLists.onHold,
                    planTo: gameLists.planTo,
                    replaying: gameLists.replaying
                }
                setGameLists(temp)
                break;
            }
            case 'onHold': {
                break;
            }
            case 'planTo' : {
                break;
            }
            case 'replaying': {
                break;
            }
            default: {
                CreateErrorToaster('Could not find list entry')
            }
        }
        setIsPopupOpen(false)
        if (selectedInput?.entryID) {
            const result = await DeleteUserListEntry(selectedInput.entryID)

            if (result.success) {
                CreateSuccessToaster(result.data.deleteGameListEntry.message)
            } else {
                CreateErrorToaster(result.error)
            }
        } else {
            CreateErrorToaster('Cannot delete entry. Try again later.')
        }
    }

    return (
        <IDContext.Provider value={paramID}>
            <div id="page-asobu-gamelist" className="page-content">
                {
                    !isLoading && <SetBreadcrumbs breadcrumbs={['Asobu', 'List', `${username}'s game list`]} /> 
                }
                {
                    showLogin ?
                        <LoginRequired />
                    :
                    <>
                        <div id="gamelist-stats">
                            <Statistics
                                isLoading={isLoading}
                                counts={{
                                    playing: gameLists.playing.length,
                                    completed: gameLists.completed.length,
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
                                            <GameList list={gameLists.playing} listType="playing" handleOpenPopup={handleOpenPopup} />   
                                        </Tabs.Content>
                                        <Tabs.Content value="completed">
                                            <GameList list={gameLists.completed} listType="completed" handleOpenPopup={handleOpenPopup} />   
                                        </Tabs.Content>
                                        <Tabs.Content value="planTo">
                                            <GameList list={gameLists.planTo} listType="planTo" handleOpenPopup={handleOpenPopup} />   
                                        </Tabs.Content>
                                        <Tabs.Content value="onHold">
                                            <GameList list={gameLists.onHold} listType="onHold" handleOpenPopup={handleOpenPopup} />   
                                        </Tabs.Content>
                                        <Tabs.Content value="replaying">
                                            <GameList list={gameLists.replaying} listType="replaying" handleOpenPopup={handleOpenPopup} />   
                                        </Tabs.Content>
                                    </React.Fragment>
                            }
                        </Tabs.Root>
                    </>
                }
            </div>
            <Dialog.Root 
                lazyMount 
                open={isPopupOpen} 
                onOpenChange={(e) => setIsPopupOpen(e.open)}
                placement={"center"}
                motionPreset="slide-in-bottom"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Delete Entry</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>Are you sure?</Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={() => handleDeleteEntry()}>Delete</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            {/* <CloseButton size="sm" /> */}
                        </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </IDContext.Provider>
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

function GameList(
    {
        list,
        listType,
        handleOpenPopup,
    } : {
        list: GameListEntry[],
        listType: GameListEntryStatus ,
        handleOpenPopup: (listType: GameListEntryStatus, entry_id: number) => void
    }) {

    const paramID = useContext(IDContext)
    const user = useUserStore((state) => state.user );

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
                        {
                            user.id == paramID && 
                            <Table.ColumnHeader>Action(s)</Table.ColumnHeader>
                        }
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
                                        {
                                            user.id == paramID && 
                                                <Table.Cell>
                                                    <IconButton onClick={() => handleOpenPopup(listType, entry.id)}>
                                                        <Trash2 />
                                                    </IconButton>
                                                </Table.Cell>
                                        }
                                    </Table.Row>
                                ))
                            :
                                <Table.Row>
                                    <Table.Cell colSpan={6}> No Games Here!</Table.Cell>
                                </Table.Row>
                        :
                            <Table.Row>
                                <Table.Cell colSpan={6}>Loading</Table.Cell>
                            </Table.Row>
                    }
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    )
}

