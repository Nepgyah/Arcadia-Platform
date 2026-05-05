'use client';

import React, { useContext } from "react";
import { use, useEffect, useState } from "react";
import { Button, Dialog, Portal, Tabs } from "@chakra-ui/react";

import { DeleteUserListEntry, FetchUserGameList } from "./action";
import { CalendarClock, CheckCheck, GamepadDirectional, RotateCcw, SquarePause, Trash2 } from "lucide-react";

import { useUserStore } from "@/app/store/store";
import { GameListEntry, GameListEntryStatus } from "@/types/asobu";
import { CreateErrorToaster, CreateSuccessToaster } from "@/utils/toasterHelpers";
import TableSkeleton from "@/components/custom/tableSkeleton";
import LoginRequired from "@/components/custom/loginRequired";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import StatCardSkeleton from "@/components/custom/stat-card/statCardSkeleton";
import StatCard from "@/components/custom/stat-card/statCard";
import CopyToClipboardButton from "@/components/custom/copyClipboardButton";
import UserOwnPageContextWrapper, { UserOwnPageContext } from "@/contexts/usersOwnPage";

import GameListTable from "./gameListTable";

import '@/styles/pages/asobu/_gamelist.scss';

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
    const isUsersOwnPage = useContext(UserOwnPageContext)
    const user = useUserStore((state) => state.user );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
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
        let temp = gameLists
        switch(selectedInput?.listType) {
            case 'playing': {
                let result = gameLists.playing.filter(item => item.id !== selectedInput.entryID)
                temp = {
                    playing: result,
                    completed: gameLists.completed,
                    onHold: gameLists.onHold,
                    planTo: gameLists.planTo,
                    replaying: gameLists.replaying
                }
                break;
            }
            case 'completed': {
                let result = gameLists.completed.filter(item => item.id !== selectedInput.entryID)
                temp = {
                    playing: gameLists.playing,
                    completed: result,
                    onHold: gameLists.onHold,
                    planTo: gameLists.planTo,
                    replaying: gameLists.replaying
                }
                break;
            }
            case 'onHold': {
                let result = gameLists.onHold.filter(item => item.id !== selectedInput.entryID)
                temp = {
                    playing: gameLists.playing,
                    completed: gameLists.completed,
                    onHold: result,
                    planTo: gameLists.planTo,
                    replaying: gameLists.replaying
                }
                break;
            }
            case 'planTo' : {
                let result = gameLists.playing.filter(item => item.id !== selectedInput.entryID)
                temp = {
                    playing: gameLists.playing,
                    completed: gameLists.completed,
                    onHold: gameLists.onHold,
                    planTo: result,
                    replaying: gameLists.replaying
                }
                break;
            }
            case 'replaying': {
                let result = gameLists.playing.filter(item => item.id !== selectedInput.entryID)
                temp = {
                    playing: gameLists.playing,
                    completed: gameLists.completed,
                    onHold: gameLists.onHold,
                    planTo: gameLists.planTo,
                    replaying: result
                }
                break;
            }
            default: {
                CreateErrorToaster('Could not find list entry')
            }
        }
        setGameLists(temp)
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

    const handleListExport = async () => {
        setIsButtonLoading(true)
        try {
            const response = await fetch('/api/asobu/export');
            if (!response.ok) throw new Error('Download failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'game_list_export.json');
            document.body.appendChild(link);
            link.click();
            
            if(link.parentNode) {
                link.parentNode.removeChild(link);
            }
            window.URL.revokeObjectURL(url);

            CreateSuccessToaster('Gamelist generated!');
        } catch (error) {
            CreateErrorToaster('Error exporting list');
        } finally {
            setIsButtonLoading(false);
        }
    }

    return (
        <UserOwnPageContextWrapper userID={paramID}>
            <div id="page-asobu-gamelist" className="page-content">
                {
                    !isLoading && <SetBreadcrumbs breadcrumbs={['Asobu', 'List', `${username}'s game list`]} /> 
                }
                {
                    showLogin ?
                        <LoginRequired />
                    :
                    <>
                        <div id="overview" className={`${isUsersOwnPage && 'two-column'}`}>
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
                            {
                                isUsersOwnPage &&
                                <div id="actions" className="button-container">
                                    <CopyToClipboardButton text="Share List" link={`${window.location.href}/${user.id}`}/>
                                    <Button variant={'ghost'} onClick={() => handleListExport()} loading={isButtonLoading}>
                                        Export
                                    </Button>
                                </div>
                            }
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
                                            <GameListTable list={gameLists.playing} listType="playing" handleOpenPopup={handleOpenPopup} />   
                                        </Tabs.Content>
                                        <Tabs.Content value="completed">
                                            <GameListTable list={gameLists.completed} listType="completed" handleOpenPopup={handleOpenPopup} />   
                                        </Tabs.Content>
                                        <Tabs.Content value="planTo">
                                            <GameListTable list={gameLists.planTo} listType="planTo" handleOpenPopup={handleOpenPopup} />   
                                        </Tabs.Content>
                                        <Tabs.Content value="onHold">
                                            <GameListTable list={gameLists.onHold} listType="onHold" handleOpenPopup={handleOpenPopup} />   
                                        </Tabs.Content>
                                        <Tabs.Content value="replaying">
                                            <GameListTable list={gameLists.replaying} listType="replaying" handleOpenPopup={handleOpenPopup} />   
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
                            <Dialog.Title>Delete Entry?</Dialog.Title>
                        </Dialog.Header>
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
        </UserOwnPageContextWrapper>
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
            <div id="stats-container">
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
            </div>
        )
    }
}

