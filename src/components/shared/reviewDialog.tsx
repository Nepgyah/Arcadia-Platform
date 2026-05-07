'use client';

import { MediaReview } from "@/types/base";
import { Button, Checkbox, CloseButton, Dialog, Field, Portal, Textarea } from "@chakra-ui/react";
import SelectScore from "../ui/selectScore";
import { useEffect, useState } from "react";

interface DialogProps {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
} 

export default function ReviewDialog(
    {
        dialogState,
        review,
    } : {
        dialogState: DialogProps,
        review: string | null
    }
) {

    const [inputReview, setInputReview] = useState<string>('')
    
    useEffect(() => {
        if (review) {
            setInputReview(review)
        }
    }, [review])

    const handleCreateReview = () => {
        console.log(inputReview)
    }
    
    return (
        <Dialog.Root open={dialogState.isOpen} onOpenChange={(e) => dialogState.setIsOpen(e.open)} size={'lg'}>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
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
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleCreateReview}>Save</Button>
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