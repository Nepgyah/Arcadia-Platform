'use client';

import * as z from 'zod';
import { POSTResponse } from "@/types/api";
import { App, MediaReview, MediaReviewInput } from '@/types/base';
import { Button, CloseButton, Dialog, Field, NativeSelect, Portal, Textarea } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { CreateErrorToaster, CreateSuccessToaster } from '@/lib/helper/toasterHelpers';
import MediaReviewContextWrapper, { MediaReviewContext } from '@/contexts/hasReviewContext';
import SelectScore from '@/components/ui/selectScore';

interface DialogProps {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}

interface ReviewProps {
    review: MediaReview | null,
    setReview: (review: MediaReview | null) => void
}

interface ServerActionSet {
    create: (mediaID: number, details: MediaReviewInput) => Promise<POSTResponse<any>>,
    update: (mediaID: number, details: MediaReviewInput) => Promise<POSTResponse<any>>,
    delete: (mediaID: number) => Promise<POSTResponse<any>>
}

const ReviewText = z.object({
  text: z.string().min(24, 'Minimum 24 letters for a review').max(2000, 'Maximum 2000 letters for a review')
})

const ReviewScore = z.object({
    score: z.number().min(1, 'Invalid score option').max(10, 'Invalid score option')
})

export default function ReviewDialog(
    {
        reviewProps,
        app,
        dialogState,
        serverActions,
        mediaID,
        children
    } : {
        reviewProps: ReviewProps,
        app: App,
        dialogState: DialogProps,
        serverActions: ServerActionSet,
        mediaID: number,
        children: React.ReactNode
    }
) {
    const context = useContext(MediaReviewContext)
    if (!context) {
        throw new Error("ReviewDialog must be used within a MediaReviewContextWrapper");
    }

    const {hasReview, setHasReview} = context;
    const [loading, setIsLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<MediaReviewInput>({
        score: -1,
        text: "",
    })
    
    useEffect(() => {
        if (reviewProps.review) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDetails({
                score: reviewProps.review.score ? reviewProps.review.score : -1,
                text: reviewProps.review.text,
            });
        }
    }, [reviewProps.review]);
    
    const checkDetails = () : Boolean => {
        const textResult = ReviewText.safeParse({
            text: details.text
        })
        if (!textResult.success) {
            CreateErrorToaster(textResult.error.issues[0].message)
            setIsLoading(false)
            return false
        }
        if (details.score != -1) {
            const scoreResult = ReviewScore.safeParse({
                score: details.score
            })
            if (!scoreResult.success) {
                CreateErrorToaster(scoreResult.error.issues[0].message)
                setIsLoading(false)
                return false
            }
        }
        return true
    }
    
    const updateStates = () => {
        setIsLoading(false)
        dialogState.setIsOpen(false)
    }

    const handleCreate = async () => {
        setIsLoading(true)    
        if (checkDetails()) {
            const response = await serverActions.create(mediaID, details)
            if (response.success) {
                CreateSuccessToaster(response.message)
                setHasReview(true)
                reviewProps.setReview(response.data.review)
            } else {
                CreateErrorToaster(response.message)
            }
            updateStates()
        }
    }

    const handleUpdate = async () => {
        setIsLoading(true)
        if (checkDetails()) {
            const response = await serverActions.update(mediaID, details)
            if (response.success) {
                CreateSuccessToaster(response.message)
            } else {
                CreateErrorToaster(response.message)
            }
            updateStates()
        }
    }

    const handleDelete = async () => {
        setIsLoading(true)
        const response = await serverActions.delete(mediaID)
        if (response.success) {
            CreateSuccessToaster(response.message)
        } else {
            CreateErrorToaster(response.message)
        }
        setHasReview(false)
        reviewProps.setReview(null)
        updateStates()
    }

    return (
        <Dialog.Root
            open={dialogState.isOpen}
            onOpenChange={(e) => dialogState.setIsOpen(e.open)} 
            size={'lg'}
            placement={'center'}
        >
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop>
                    <Dialog.Positioner>
                        <Dialog.Content id={`${app}-theme`}>
                            <Dialog.Header>
                            <Dialog.Title>Review</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body className="flex flex-column row-gap-md">
                            <Field.Root required>
                                <Field.Label>Write Your Review</Field.Label>
                                <Textarea 
                                    placeholder="Absolute Cinema / Aquired Taste / etc" 
                                    resize={'vertical'}
                                    minH={'10lh'}
                                    value={details.text}
                                    onChange={(e) =>
                                        setDetails((prev) => ({
                                            ...prev,
                                            text: e.target.value,
                                        }))
                                    }
                                />
                                <Field.Root>
                                    <Field.Label>Score</Field.Label>
                                    <NativeSelect.Root>
                                        <NativeSelect.Field value={details.score} onChange={(e) => setDetails((prev) => ({
                                            ...prev,
                                            score: Number(e.target.value)
                                        }))}>
                                            <option value={10}>10 - Cinema</option>
                                            <option value={9}>9 - Amazing</option>
                                            <option value={8}>8 - Great</option>
                                            <option value={7}>7 - Actually Good</option>
                                            <option value={6}>6 - Good Trash</option>
                                            <option value={5}>5 - Mid</option>
                                            <option value={4}>4 - Watchable Trash</option>
                                            <option value={3}>3 - Very Bad</option>
                                            <option value={2}>2 - Appaling</option>
                                            <option value={1}>1 - Actual Trash</option>
                                            <option value={-1} disabled>Select Score</option>
                                        </NativeSelect.Field>
                                    </NativeSelect.Root>
                                </Field.Root>
                                <Field.HelperText>Minimum 25, Maximum 2000 characters</Field.HelperText>
                            </Field.Root>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Close</Button>
                                </Dialog.ActionTrigger>
                                {
                                    !hasReview ?
                                        <Button className="btn-primary" onClick={handleCreate}>
                                            Create Review
                                        </Button>
                                    :
                                    <>
                                        <Button className="btn-primary" onClick={handleUpdate}>Update</Button>
                                        <Button variant={'ghost'} onClick={handleDelete}>Delete</Button>
                                    </>
                                }
                                </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Backdrop>
            </Portal>
        </Dialog.Root>
    )
}