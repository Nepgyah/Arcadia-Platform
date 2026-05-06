import { User } from "@/types/user";
import { Avatar } from "@chakra-ui/react";
import Link from "next/link";

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
        <div className="review-card card shadow border-radius-md p-a-md">
            <div className="review-card__overview">
                <div className="review-card__user">
                    <Link href={`/profile/${user.id}`}>
                        <Avatar.Root>
                            <Avatar.Image src={`/storage/preset-profile-pics/${user.picturePreset}.webp`} />
                        </Avatar.Root>
                    </Link>
                    <Link href={`/profile/${user.id}`} className="hover-underline">
                        <p className="clr-app-emp bold">{user.username}</p>
                    </Link>
                </div>
                <div className="review-card__metadata">
                    <p>Score: <span className="clr-app-emp">{score}</span></p>
                    <p>{}</p>
                </div>
                
            </div>
            <div className="review-card__text txt-sm" style={{ whiteSpace: 'pre-line' }}>
                {reviewText}
            </div>
        </div>
    )
}