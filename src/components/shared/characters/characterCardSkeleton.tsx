import { Skeleton } from "@chakra-ui/react";

export default function CharacterCardSkeleton() {
    return (
        <div className="character-container">
            {
                Array.from({length: 6}).map((_, i) => (
                    <Skeleton key={i} height={'117px'} width={'100%'}/>
                ))
            }
        </div>
    )
}