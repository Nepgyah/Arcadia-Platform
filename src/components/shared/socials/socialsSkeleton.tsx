import { Skeleton } from "@chakra-ui/react";

export default function SocialsSkeleton() {
    return (
        <div className="socials-list">
            {
                Array.from({length: 3}).map((_, i) => (
                    <Skeleton key={i} height={'46px'} width={'100%'}/>
                ))
            }
        </div>
    )
}