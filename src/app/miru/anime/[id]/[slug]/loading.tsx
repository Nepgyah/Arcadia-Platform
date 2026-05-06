import Header from "@/components/ui/headers/header"
import { Skeleton, SkeletonText } from "@chakra-ui/react"

export default function Loading() {
    return (
        <div id="page-anime-details" className="page-content">
            <HeroSkeleton />
            <div className="split-content">
                <div className="details">
                    <div>
                        <Header text="Misc" />
                        <SkeletonText noOfLines={3} />
                    </div>
                    <div>
                        <Header text="Production" />
                        <SkeletonText noOfLines={3} />
                    </div>
                </div>
                <div>
                    <div id="tab-container">
                        <Skeleton width={'175px'} height={'118px'} />
                        <Skeleton width={'175px'} height={'118px'} />
                        <Skeleton width={'175px'} height={'118px'} />
                    </div>
                    <div>
                        <div id="overview-tab" className="flex flex-column row-gap-md">
                            <div id="genres-franchise">
                                <div>
                                    <Header text="Genres"/>
                                    <div className="flex flex-wrap flex-gap-sm">
                                        <Skeleton height="32px" width={'64px'}/>
                                        <Skeleton height="32px" width={'64px'}/>
                                        <Skeleton height="32px" width={'64px'}/>
                                        <Skeleton height="32px" width={'64px'}/>
                                        <Skeleton height="32px" width={'64px'}/>
                                    </div>
                                </div>
                                <div>
                                    <Header text="Franchise"/>
                                    <Skeleton height="200px" width={'100%'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function HeroSkeleton() {
    return (
        <div id="hero">
            <Skeleton height={250} width={'100%'}/>
            <Skeleton height={250} width={'100%'}/>
        </div>
    )
}