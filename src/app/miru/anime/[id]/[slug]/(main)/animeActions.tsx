'use client';

import ReviewDialog from "@/components/shared/review/reviewDialog";
import { useUserStore } from "@/app/store/userStore";
import { useEffect, useState } from "react";
import { CreateAnimeReivew, GetAnimeReview } from "./actions";
import { MediaReview } from "@/types/base";
import MediaReviewContextWrapper, { MediaReviewContext } from "@/contexts/hasReviewContext";

export default function MediaActions({animeID}:{animeID: number}) {

    const user = useUserStore((state) => state.user);
    const [reviewOpen, setReviewOpen] = useState<boolean>(false);
    const [review, setReview] = useState<MediaReview | null>(null)
    const [hasReview, setHasReview] = useState<boolean>(false)

    useEffect(() => {
        const fetchEntry = async (animeID: number) => {
            const response = await GetAnimeReview(animeID)
            if (response.success) {
                setHasReview(true)
                setReview(response.data.miru.review)
            }
        }

        if (user && animeID) {
            fetchEntry(Number(animeID))
        }
    }, [user, animeID])

    return (
        <MediaReviewContextWrapper hasReview={hasReview} setHasReview={setHasReview}>
            <ReviewDialog
                review={null}
                app={'miru'}
                mediaID={animeID}
                dialogState={{
                    isOpen: reviewOpen, 
                    setIsOpen: setReviewOpen
                }}
                serverActions={{
                    create: CreateAnimeReivew
                }}
            />
        </MediaReviewContextWrapper>
    )
}