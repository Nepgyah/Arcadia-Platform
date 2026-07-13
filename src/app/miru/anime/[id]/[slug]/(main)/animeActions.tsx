'use client';

import ReviewDialog from "@/components/shared/review/reviewDialog";
import { useState } from "react";

export default function MediaActions({animeID}:{animeID: number}) {

    const [reviewOpen, setReviewOpen] = useState<boolean>(false);

    return (
        <ReviewDialog
            review={null}
            app={'miru'}
            mediaID={animeID}
            dialogState={{
                isOpen: reviewOpen, 
                setIsOpen: setReviewOpen
            }}
        />
    )
}