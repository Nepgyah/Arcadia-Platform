'use client';

import * as z from 'zod';
import { ActionResult, APIResult, MessagedActionResult, MutationResponse } from "@/types/api";
import { App, MediaReview, MediaReviewInput } from '@/types/base';
import { Button, CloseButton, Dialog, Field, Portal, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { CreateErrorToaster, CreateSuccessToaster } from '@/lib/helper/toasterHelpers';

interface DialogProps {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}

interface ServerActionSet {
    create: (mediaID: number, details: MediaReviewInput) => Promise<MutationResponse<any>>,
    // update: (mediaID: number, text: string) => Promise<MessagedActionResult<any>>,
    // delete: (mediaID: number) => Promise<MessagedActionResult<any>>
}

const ReviewText = z.object({
  text: z.string().min(25, 'Minimum 25 letters for a review').max(2000, 'Maximum 2000 letters for a review')
})

export default function ReviewDialog(
    {
        review,
        app,
        dialogState,
        serverActions,
        mediaID
    } : {
        review: MediaReview | null,
        app: App,
        dialogState: DialogProps,
        serverActions: ServerActionSet,
        mediaID: number
    }
) {

    const [loading, setIsLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<MediaReviewInput>({score: -1, text: ''})
    
    const handleCreate = async () => {
        setIsLoading(true)    
        const response = await serverActions.create(mediaID, details)
        if (response.success) {
            CreateSuccessToaster(response.message)
        } else {
            CreateErrorToaster(response.message)
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>Review</Button>
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
                                <Field.HelperText>Minimum 25, Maximum 2000 characters</Field.HelperText>
                            </Field.Root>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Close</Button>
                                </Dialog.ActionTrigger>
                                {
                                    <Button className="btn-primary" onClick={handleCreate}>
                                        Create Review
                                    </Button>
                                    // !hasReview ?
                                    // <Button loading={isLoading} onClick={handleCreateReview} className="btn-primary">Create</Button>
                                    // :
                                    // <>
                                    //     <Button loading={isLoading} onClick={handleUpdateReview} className="btn-primary">Update</Button>
                                    //     <Button loading={isLoading} onClick={handleDeleteReview} variant={'ghost'}>Delete</Button>
                                    // </>
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