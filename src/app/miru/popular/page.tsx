'use client';

import React from "react";
import { useEffect, useState } from "react";
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toaster } from "@/components/ui/toaster";

import DetailMediaCard from "@/components/media/detailedCard/detailedMediaCard";
import SetBreadcrumbs from "@/components/shared/breadcrumbs/setBreadcrumbs";
import DetailMediaCardSkeleton from "@/components/media/detailedCard/detailedMediaCardSkeleton";
import { FetchPopularAnimeAction } from "./actions";
import { Anime } from "@/types/miru";

import '@/styles/pages/miru/_rankings.scss';

export default function Page() {
    
    const [loading, setLoading] = useState(true)
    const [animes, setAnimes] = useState<Anime[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalCount, setTotalCount] = useState<number>(0)
    
    useEffect(() => {
        FetchAnime(1)
        .then(() => {
            setLoading(false)
        })
    }, [])

    async function FetchAnime(page: number) {
        const result = await FetchPopularAnimeAction(page)

        if (!result.success) {
            toaster.create({
                title: result.error,
                type: 'error'
            })
        } else {
            setAnimes(result.data.searchAnime.animes)
            setTotalCount(result.data.searchAnime.total)
        }
    }

    const handlePageChange = (direction: 'prev' | 'next') => {
        if (direction === 'next') {
            FetchAnime(currentPage + 1)
            setCurrentPage((prev) => prev + 1)
        } else {
            setCurrentPage((prev) => prev + -1)
            FetchAnime(currentPage - 1)
        }
    }

    return (
        <div id="page-miru-rankings">
            <SetBreadcrumbs breadcrumbs={['Miru', 'Popular']} />
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