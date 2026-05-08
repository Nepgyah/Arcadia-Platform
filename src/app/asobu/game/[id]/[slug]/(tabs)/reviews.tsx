import ReviewCard from "@/components/shared/reviewCard"
import { MediaReview } from "@/types/base"
import { use } from "react"

export default function ReviewTab(
    {
        reviewPromise
    } : {
        reviewPromise: Promise<MediaReview[]>
    }
) {
    const reviews = use(reviewPromise)

    return (
        <div id="review-tab" className="flex flex-column row-gap-md">
            {
                reviews.map((review: MediaReview, idx: number) => (
                    <ReviewCard
                        key={idx}
                        user={review.user}
                        review={review}
                    />
                ))
            }
        </div>
    )
}