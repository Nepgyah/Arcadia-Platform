import '@/styles/components/cards/media/_basic-media-card.scss';
import { Skeleton, SkeletonText } from '@chakra-ui/react';

export default function BasicMediaCardLoading() {

    return (
        <div className="basic-media-card">
            <Skeleton className="basic-media-card__image" width={'100%'}/>
            <SkeletonText className='basic-media-card__title' noOfLines={1} />
        </div>
    )
}