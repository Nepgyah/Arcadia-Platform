'use client';

import { App, MediaReview } from "@/types/base";
import { Button, Checkbox, CloseButton, Dialog, Field, Portal, Textarea } from "@chakra-ui/react";
import SelectScore from "../ui/selectScore";
import { useEffect, useState } from "react";
import { ActionResult } from "@/types/api";
import { CreateErrorToaster, CreateSuccessToaster } from "@/lib/helper/toasterHelpers";

interface DialogProps {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
} 

interface ServerActionSet {
    create: (mediaID: number, text: string) => Promise<ActionResult<any>>,
    update: (mediaID: number, text: string) => Promise<ActionResult<any>>,
    delete: (mediaID: number) => Promise<ActionResult<any>>
}
export default function ReviewDialog(
    {
        app,
        dialogState,
        review,
        serverActions,
        mediaID
    } : {
        app: App,
        dialogState: DialogProps,
        review: MediaReview | null,
        serverActions: ServerActionSet,
        mediaID: number
    }
) {

    const [inputReview, setInputReview] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (review) {
            setInputReview(review.text)
        }
    }, [review])

    const handleCreateReview = async () => {
        setIsLoading(true);
        const result = await serverActions.create(mediaID, inputReview)
        if (result.success) {
          CreateSuccessToaster('You created a review');
          setIsLoading(false);
        } else {
          CreateErrorToaster(result.error)
        }
        dialogState.setIsOpen(false)
    }
    
    const handleUpdateReview = async () => {
      setIsLoading(true);
      const result = await serverActions.update(mediaID, inputReview)
      if (result.success) {
        CreateSuccessToaster('You updated your review');
        setIsLoading(false);
      } else {
        CreateErrorToaster(result.error)
      }
      dialogState.setIsOpen(false)
    }

    const handleDeleteReview = async () => {
      setIsLoading(true);
      const result = await serverActions.delete(mediaID)
      if (result.success) {
        CreateSuccessToaster('You deleted your review');
        setIsLoading(false);
      } else {
        CreateErrorToaster(result.error)
      }
      dialogState.setIsOpen(false)
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
                        <Field.HelperText>Maximum 500 characters</Field.HelperText>
                    </Field.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Close</Button>
                    </Dialog.ActionTrigger>
                    {
                      review == null ?
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