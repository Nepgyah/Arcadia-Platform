import { Skeleton, SkeletonText } from "@chakra-ui/react";

export default function DetailMediaCardSkeleton() {
    return (
        <div className="detail-media card">
            <div className="detail-media__title">
                <SkeletonText noOfLines={1} />
            </div>
            <div className="detail-media__metrics">
                <SkeletonText noOfLines={1} width={'75%'} />
                <SkeletonText noOfLines={1} width={'75%'} />
            </div>
            <div className="detail-media__main">
                <Skeleton />
                <div className="description">
                    <SkeletonText noOfLines={5} />
                </div>
            </div>
            <div className="detail-media__franchise">
                <SkeletonText noOfLines={1} />
            </div>
        </div>
    )
}