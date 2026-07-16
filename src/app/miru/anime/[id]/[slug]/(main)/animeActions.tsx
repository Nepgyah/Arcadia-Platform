'use client';

import ReviewDialog from "@/components/shared/review/reviewDialog";
import { useUserStore } from "@/app/store/userStore";
import { useEffect, useState } from "react";
import { CreateAnimeReivew, DeleteAnimeReview, GetAnimeReview, UpdateAnimeReview } from "./actions";
import { MediaReview } from "@/types/base";
import MediaReviewContextWrapper, { MediaReviewContext } from "@/contexts/hasReviewContext";
import { Button, Dialog, Field, NativeSelect, NumberInput, Portal } from "@chakra-ui/react";
import { FetchAnimeListEntryAction } from "../actions";

export default function MediaActions({animeID}:{animeID: number}) {

    const user = useUserStore((state) => state.user);
    const [reviewOpen, setReviewOpen] = useState<boolean>(false);
    const [review, setReview] = useState<MediaReview | null>(null)
    const [hasReview, setHasReview] = useState<boolean>(false)

    const [listOpen, setListOpen] = useState<boolean>(false);
    const [listEntry, setListEntry] = useState<any>(null);

    useEffect(() => {
        const fetchReview = async (animeID: number) => {
            const response = await GetAnimeReview(animeID)
            if (response.success) {
                setHasReview(true)
                setReview(response.data.miru.review)
            }
        }
        
        const fetchEntry = async (animeID: number) => {
            const result = await FetchAnimeListEntryAction(Number(animeID))
            if (result.success) {
                if (result.data) {
                    setListEntry(result.data.miru.animeEntry)
                }
            }
        }
        if (user && animeID) {
            fetchReview(Number(animeID))
            fetchEntry(Number(animeID))
        }
    }, [user, animeID])

    return (
        <MediaReviewContextWrapper hasReview={hasReview} setHasReview={setHasReview}>
            <ReviewDialog
                reviewProps={{
                    review: review,
                    setReview: setReview
                }}
                app={'miru'}
                mediaID={animeID}
                dialogState={{
                    isOpen: reviewOpen, 
                    setIsOpen: setReviewOpen
                }}
                serverActions={{
                    create: CreateAnimeReivew,
                    update: UpdateAnimeReview,
                    delete: DeleteAnimeReview
                }}
            >
                <Button className="btn-primary">
                    {
                        hasReview ? "Edit Review" : "Write a Review"
                    }
                </Button>
            </ReviewDialog>
            <ListDialog
                dialogState={{
                    isOpen: listOpen,
                    setIsOpen: setListOpen
                }}
                // listEntryProps={{
                //     listEntry: 
                // }}
            >

            </ListDialog>
        </MediaReviewContextWrapper>
    )
}

interface ListEntryProps {
    listEntry: any,
    setListEntry: (listEntry: any) => void
}

interface DialogProps {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}

interface ListEntryInput {
    status: number,
    episodes: number
}
function ListDialog(
    {
        // listEntryProps,
        dialogState
    } : {
        // listEntryProps: ListEntryProps,
        dialogState: DialogProps
    }
) {

    const [listEntryInput, setListEntryInput] = useState<ListEntryInput>({
        status: -1,
        episodes: 0
    })

    return (
        <Dialog.Root
            open={dialogState.isOpen}
            onOpenChange={(e) => dialogState.setIsOpen(e.open)}
            size={'md'}
            placement={'center'}
        >
            <Dialog.Trigger asChild>
                <Button>
                    Create Entry
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>List Entry</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body className="flex flex-column row-gap-md">
                                <Field.Root>
                                    <Field.Label>Status</Field.Label>
                                    <NativeSelect.Root>
                                        <NativeSelect.Field value={listEntryInput.status} onChange={(e) => setListEntryInput((prev) => ({
                                            ...prev,
                                            status: Number(e.target.value)
                                        }))}>
                                            <option value={0}>Watching</option>
                                            <option value={1}>Completed</option>
                                            <option value={2}>Plan To Watch</option>
                                            <option value={3}>On Hold</option>
                                            <option value={-1} disabled>Select Status</option>
                                        </NativeSelect.Field>
                                    </NativeSelect.Root>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Episodes</Field.Label>
                                    <div className="flex">
                                        <NumberInput.Root defaultValue="10" width="200px">
                                            <NumberInput.Control />
                                            <NumberInput.Input />
                                        </NumberInput.Root>
                                    </div>
                                </Field.Root>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Backdrop>
            </Portal>
        </Dialog.Root>
    )
}