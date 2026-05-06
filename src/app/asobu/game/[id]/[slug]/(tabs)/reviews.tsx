import ReviewCard from "@/components/reviewCard"
import { GameListEntry } from "@/types/asobu"
import { use } from "react"

export default function ReviewTab(
    {
        reviewPromise
    } : {
        reviewPromise: Promise<any[]>
    }
) {
    const reviews = use(reviewPromise)

    return (
        <div id="review-tab" className="flex flex-column row-gap-md">
            {
                reviews.map((review: GameListEntry, idx: number) => (
                    <ReviewCard
                        key={idx}
                        user={review.user}
                        reviewText={review.review}
                        score={review.score} 
                    />
                ))
            }
        </div>
    )
}