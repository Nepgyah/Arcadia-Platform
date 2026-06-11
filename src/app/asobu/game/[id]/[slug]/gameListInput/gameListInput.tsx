'use client';

import { useEffect, useState } from "react";

import { useUserStore } from "@/app/store/userStore";
import { Button, CloseButton, Dialog, Field, NativeSelect, Portal } from "@chakra-ui/react";
import Header from "@/components/ui/headers/header";
import { CreateErrorToaster, CreateSuccessToaster } from "@/lib/helper/toasterHelpers";
import { toaster } from "@/components/ui/toaster";
import SelectScore from "@/components/ui/selectScore";
import ReviewDialog from "@/components/shared/reviewDialog";
import MediaReviewContextWrapper from "@/contexts/hasReviewContext";
import { GameListEntry, GameListEntryMetadataSchema } from "@/types/asobu";
import { MediaReview } from "@/types/base";

import { CreateGameListEntry, CreateGameReview, DeleteGameListEntry, DeleteGameReview, FetchUserGameListEntry, UpdateGameListEntry, UpdateGameReview } from "./actions";

export default function GameListInput({gameID} : {gameID: number}) {
    const user = useUserStore((state) => state.user);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(-1)
    const [score, setScore] = useState<number>(-1)
    const [entry, setEntry] = useState<GameListEntry | null>(null)
    const [isEntryFound, setIsEntryFound] = useState<boolean>(false);
    const [review, setReview] = useState<MediaReview | null>(null)
    const [hasReview, setHasReview] = useState<boolean>(false)
    const [isDeleteListDialogOpen, setIsDeleteDialogOpen] = useState(false)

    useEffect(() => {
        const fetchEntry = async (gameID: number) => {
            const result = await FetchUserGameListEntry(gameID);

            if (result.success) {
                if (result.data.asobu.userGameListEntry) {
                    setIsEntryFound(true)
                    setEntry(result.data.asobu.userGameListEntry)
                    setStatus(result.data.asobu.userGameListEntry.status)
                    setScore(result.data.asobu.userGameListEntry.score)
                }
            } else {
                CreateErrorToaster(result.error)
            }
        }

        if (user && gameID) {
            fetchEntry(Number(gameID))
        }
    }, [user, gameID])

    const formatDetails = () => {
        try {
            let details = GameListEntryMetadataSchema.parse({
                status: status,
                score: score,
                note: null,
                startPlayDate: null,
                endPlayDate: null
            })
            return details
        } catch (error: any) {
            CreateErrorToaster(error.issues[0].message)
        }
    }

    const handleNewEntry = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)
        if (status == -1) {
            toaster.create({
                title: 'Select a status',
                type: 'info'
            })
        } else {
            const formattedDetails = formatDetails()
            if (formattedDetails) {
                const result = await CreateGameListEntry(Number(gameID), formattedDetails)

                if (result.success) {
                    toaster.create({
                        title: result.data.createGameListEntry.message,
                        type: 'success'
                    })
                    setIsLoading(false)
                    setIsEntryFound(true)
                } else {
                    CreateErrorToaster(result.error)
                }
            }
        }
    }

    const handleUpdateEntry = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)
        if (status == -1) {
            toaster.create({
                title: 'Select a status',
                type: 'info'
            })
        } else {
            const formattedDetails = formatDetails()
            if (formattedDetails) {
                const result = await UpdateGameListEntry(Number(gameID), formattedDetails)

                if (result.success) {
                    toaster.create({
                        title: result.data.updateGameListEntry.message,
                        type: 'success'
                    })
                    setIsLoading(false)
                } else {
                    CreateErrorToaster(result.error)
                }
            }
        }
    }
    
    const handleDeleteEntry = async () => {
        const result = await DeleteGameListEntry(Number(gameID))

        if (result.success) {
            CreateSuccessToaster("Entry deleted.")
            setIsEntryFound(false)
            setStatus(-1)
            setScore(-1)
            setIsDeleteDialogOpen(false)
        } else {
            CreateErrorToaster(result.error)
        }
    }

    return (
        <MediaReviewContextWrapper hasReview={hasReview} setHasReview={setHasReview}>
            <DeleteListModal 
                isOpen={isDeleteListDialogOpen}
                setIsOpen={setIsDeleteDialogOpen}
                handleDelete={handleDeleteEntry}
            />
            <div id="game-list-input">
                <Header text="Entry" />
                {
                    !user ? 
                        <p>Login to see your gamelist</p>
                    :
                    <form className="flex flex-column row-gap-md">
                        <Field.Root>
                            <Field.Label>Status</Field.Label>
                            <NativeSelect.Root>
                                <NativeSelect.Field value={status} onChange={(e) => setStatus(Number(e.target.value))}>
                                    <option value={-1} disabled>Select Status</option>
                                    <option value={0}>Playing</option>
                                    <option value={1}>Completed</option>
                                    <option value={2}>Plan To</option>
                                    <option value={3}>On Hold</option>
                                    <option value={4}>Replyaing</option>
                                </NativeSelect.Field>
                            </NativeSelect.Root>
                        </Field.Root>
                        <SelectScore currentValue={score} setFunction={setScore} />
                        <div id="actions">
                            {
                                isEntryFound ?
                                <>
                                    <Button 
                                        onClick={(e) => handleUpdateEntry(e)}
                                        loading={isLoading}
                                        variant={'subtle'} 
                                        className="btn-primary"
                                    >
                                        Update
                                    </Button>
                                    <Button 
                                        onClick={() => setIsDeleteDialogOpen(true)}
                                        variant={'ghost'}
                                    >
                                        Delete
                                    </Button>
                                </>
                            :
                                <Button 
                                    onClick={(e) => handleNewEntry(e)} 
                                    loading={isLoading}
                                    variant={'subtle'} 
                                    className="btn-primary"
                                >
                                    Add
                                </Button>

                            }
                        </div>
                    </form>
                }
            </div>
        </MediaReviewContextWrapper>
    )
}

function DeleteListModal(
    {
        isOpen,
        setIsOpen,
        handleDelete
    } : {
        isOpen: boolean,
        setIsOpen: (open: boolean) => void,
        handleDelete: () => void
}) {
    return (
        <Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                    <Dialog.Title>Confirmation</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <p>This action cannot be undone.</p>
                    </Dialog.Body>
                    <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={() => handleDelete()}>Delete</Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}