'use client';

import { useEffect, useState } from "react";

import { useUserStore } from "@/app/store/userStore";
import { Button, Field, NativeSelect } from "@chakra-ui/react";
import Header from "@/components/ui/headers/header";
import { CreateErrorToaster } from "@/lib/helper/toasterHelpers";
import { toaster } from "@/components/ui/toaster";
import SelectScore from "@/components/ui/selectScore";
import ReviewDialog from "@/components/shared/reviewDialog";
import MediaReviewContextWrapper from "@/contexts/hasReviewContext";
import { GameListEntry, GameListEntryMetadataSchema } from "@/types/asobu";
import { MediaReview } from "@/types/base";

import { CreateGameListEntry, CreateGameReview, DeleteGameReview, FetchUserGameListEntry, UpdateeGameListEntry, UpdateGameReview } from "./actions";

export default function GameListInput({gameID} : {gameID: number}) {
    const user = useUserStore((state) => state.user);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(-1)
    const [score, setScore] = useState<number>(-1)
    const [entry, setEntry] = useState<GameListEntry | null>(null)
    const [isEntryFound, setIsEntryFound] = useState<boolean>(false);
    const [review, setReview] = useState<MediaReview | null>(null)
    const [hasReview, setHasReview] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const fetchEntry = async (gameID: number) => {
            const result = await FetchUserGameListEntry(gameID);

            if (result.success) {
                if (result.data.gameListEntry) {
                    setIsEntryFound(true)
                    setEntry(result.data.gameListEntry)
                    setStatus(result.data.gameListEntry.status)
                    setScore(result.data.gameListEntry.score)
                }

                if (result.data.userGameReview) {
                    setHasReview(true)
                    setReview(result.data.userGameReview)
                }
            } else {
                CreateErrorToaster(result.error)
            }
        }

        if (user && gameID) {
            fetchEntry(gameID)
        }
    }, [user, gameID])

    const formatDetails = () => {
        try {
            let details = GameListEntryMetadataSchema.parse({
                score: score,
                note: null,
                review: null,
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
                const result = await CreateGameListEntry(gameID, status, formattedDetails)

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
                const result = await UpdateeGameListEntry(gameID, status, formattedDetails)

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

    return (
        <MediaReviewContextWrapper hasReview={hasReview} setHasReview={setHasReview}>
            <div id="game-list-input">
                {
                    review &&
                        <ReviewDialog 
                            review={review}
                            app="asobu"
                            dialogState={{
                                isOpen: isOpen,
                                setIsOpen: setIsOpen,
                            }} 
                            serverActions={{
                                create: CreateGameReview,
                                update: UpdateGameReview,
                                delete: DeleteGameReview
                            }}
                            mediaID={gameID}
                        />
                }
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
                                        onClick={() => setIsOpen(true)}
                                        variant={'ghost'}
                                    >
                                        {
                                            hasReview ?
                                                'Update Review'
                                            :
                                                'Add Review'
                                        }
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