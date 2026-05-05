import { User } from "@/types/user";

export default function ReviewCard(
    {
        user,
        reviewText,
        score
    } : {
        user: User,
        reviewText: string,
        score: number
    }
) {
    return (
        <div className="review-card">
            <div className="review-card__overview">
                // Avatar
                <div className="review-card__score">{score}</div>
                // Date
            </div>
            <div className="review-card__text">
                {reviewText}
            </div>
        </div>
    )
}