'use client';
import * as z from 'zod';

import {  useContext, useEffect, useState } from "react";
import { Button, CloseButton, Dialog, Field, Portal, Textarea } from "@chakra-ui/react";
import { MediaReviewContext } from "@/contexts/hasReviewContext";
import { CreateErrorToaster, CreateSuccessToaster } from "@/lib/helper/toasterHelpers";
import { App, MediaReview } from "@/types/base";
import { ActionResult } from "@/types/api";
import { text } from 'stream/consumers';

interface DialogProps {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
} 

interface ServerActionSet {
    create: (mediaID: number, text: string) => Promise<ActionResult<any>>,
    update: (mediaID: number, text: string) => Promise<ActionResult<any>>,
    delete: (mediaID: number) => Promise<ActionResult<any>>
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
    const context = useContext(MediaReviewContext)
    if (!context) {
        throw new Error("ReviewDialog must be used within a MediaReviewContextWrapper");
    }
    const {hasReview, setHasReview} = context;
    const [inputReview, setInputReview] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (review) {
            setInputReview(review.text)
        }
    }, [review])

    const verifyReview = () : Boolean => {
      const result = ReviewText.safeParse({text: inputReview});
      if (result.success) {
        return true
      } else {
        CreateErrorToaster(result.error.issues[0].message)
        return false
      }
    }
    
    const handleActionEnd = () => {
      setIsLoading(false);
      dialogState.setIsOpen(false)
    }

    const handleCreateReview = async () => {
      setIsLoading(true);
      const isValid = verifyReview()
      if (!isValid) {
        setIsLoading(false)
        return
      }

      const result = await serverActions.create(mediaID, inputReview)
      if (result.success) {
        CreateSuccessToaster('You created a review');
        setHasReview(true)
      } else {
        CreateErrorToaster(result.error)
      }

      handleActionEnd()
    }
    
    const handleUpdateReview = async () => {
      setIsLoading(true);
      const isValid = verifyReview()
      if (!isValid) {
        setIsLoading(false)
        return
      }

      const result = await serverActions.update(mediaID, inputReview)
      if (result.success) {
        CreateSuccessToaster('You updated your review');
        setHasReview(true)
      } else {
        CreateErrorToaster(result.error)
      }

      handleActionEnd()
    }

    const handleDeleteReview = async () => {
      setIsLoading(true);
      const result = await serverActions.delete(mediaID)
      if (result.success) {
        CreateSuccessToaster('You deleted your review');
        setHasReview(false);
        setInputReview('')
      } else {
        CreateErrorToaster(result.error)
      }

      handleActionEnd()
    }
    return (
        <Dialog.Root 
          open={dialogState.isOpen} 
          onOpenChange={(e) => dialogState.setIsOpen(e.open)} 
          size={'lg'}
        >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content id={`${app}-theme`}>
                  <Dialog.Header>
                    <Dialog.Title>Game Review</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body className="flex flex-column row-gap-md">
                    <Field.Root required>
                        <Field.Label>Write Your Review</Field.Label>
                        <Textarea 
                            placeholder="Absolute Cinema / Aquired Taste / etc" 
                            resize={'vertical'}
                            minH={'10lh'}
                            value={inputReview}
                            onChange={(e) => setInputReview(e.target.value)}
                        />
                        <Field.HelperText>Minimum 25, Maximum 2000 characters</Field.HelperText>
                    </Field.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Close</Button>
                    </Dialog.ActionTrigger>
                    {
                      !hasReview ?
                        <Button loading={isLoading} onClick={handleCreateReview} className="btn-primary">Create</Button>
                      :
                        <>
                          <Button loading={isLoading} onClick={handleUpdateReview} className="btn-primary">Update</Button>
                          <Button loading={isLoading} onClick={handleDeleteReview} variant={'ghost'}>Delete</Button>
                        </>
                    }
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