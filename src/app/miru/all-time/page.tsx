'use client';

import React, { useCallback } from "react";
import { useEffect, useState } from "react";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SetBreadcrumbs from "@/components/ui/breadcrumbs/setBreadcrumbs";

import '@/styles/pages/miru/_rankings.scss';
import { Anime } from "@/types/miru";
import { FetchAllTimeAnimeAction } from "./actions";
import { toaster } from "@/components/ui/toaster";
import DetailMediaCard from "@/components/shared/mediaCards/detailedCard/detailedMediaCard";
import DetailMediaCardSkeleton from "@/components/shared/mediaCards/detailedCard/detailedMediaCardSkeleton";


export default function Page() {
    
    const [loading, setLoading] = useState(true)
    const [animes, setAnimes] = useState<Anime []>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalCount, setTotalCount] = useState<number>(0)

    const FetchAnime = useCallback(async (page: number) => {
        const result = await FetchAllTimeAnimeAction(page)

        if (!result.success) {
            toaster.create({
                title: result.error,
                type: 'error'
            })
        } else {
            setAnimes(result.data.searchAnime.animes)
            setTotalCount(result.data.searchAnime.total)
        }
    }, [])
    
    useEffect(() => {
        const load = async () => {
            FetchAnime(1)
            .then(() => {
                setLoading(false);
            })
        }

        load();
    }, [])


    const handlePageChange = (direction: 'prev' | 'next') => {
        setCurrentPage((prev) => {
            const newPage = direction === 'next' ? prev + 1 : prev - 1
            FetchAnime(newPage)
            return newPage
        })
    }

    return (
        <div id="page-miru-rankings">
            <SetBreadcrumbs breadcrumbs={['Miru', 'All-Time']} />
            <div>
                <Pagination.Root count={totalCount} pageSize={10} defaultPage={1} maxW="240px">
                    <ButtonGroup variant="ghost" size="sm" w="full">
                        <Pagination.PageText format="long" flex="1" />
                        <Pagination.PrevTrigger asChild>
                            <IconButton onClick={() => handlePageChange('prev')}>
                                <ChevronLeft />
                            </IconButton>
                        </Pagination.PrevTrigger>
                        <Pagination.NextTrigger asChild>
                            <IconButton onClick={() => handlePageChange('next')}>
                                <ChevronRight />
                            </IconButton>
                        </Pagination.NextTrigger>
                    </ButtonGroup>
                </Pagination.Root>
            </div>
            <div className="container">
                {
                    loading ?
                        <Skeleton />
                    :
                        animes.length != 0 ?
                            animes.map((anime: Anime, idx: number) => (
                                <DetailMediaCard
                                    key={idx}
                                    href={`/miru/anime/${anime.id}/${anime.slug}`}
                                    title={anime.title}
                                    summary={anime.summary}
                                    users={anime.users}
                                    score={anime.score}
                                    src={anime.coverImgUrl ? anime.coverImgUrl : `/storage/miru/${anime.id}/cover.jpg`}
                                    franchise={anime.franchise}
                                />
                            ))
                        :
                            <p>No Anime Found</p>
            }
            </div>
        </div>
    )
}

function Skeleton() {
    return (
        <React.Fragment>
        {
            Array.from({length: 5}).map((_, idx) => (
                <DetailMediaCardSkeleton key={idx} />
            ))
        }
        </React.Fragment>
    )
}