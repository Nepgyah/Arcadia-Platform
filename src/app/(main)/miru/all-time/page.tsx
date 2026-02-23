'use client';

import DetailMediaCard from "@/components/custom/detail-media-card";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    
    const [animes, setAnimes] = useState([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalCount, setTotalCount] = useState<number>(0)
    
    useEffect(() => {
        FetchAnime(1);
    }, [])

    async function FetchAnime(page: number) {
        const query = 
        `
            query {
                searchAnime(
                    filters: {
                        type: -1,
                        status: -1,
                        title: "",
                    },
                    sort: {
                        category: "score",
                        direction: "desc"
                    },
                    pagination: {
                        perPage: 10,
                        currentPage: ${page}
                    }
                ) {
                    animes {
                        id,
                        title,
                        score,
                        users,
                        summary,
                        slug,
                        franchise {
                            name
                        }
                    },
                    currentPage,
                    pageCount,
                    total
                }
            }
        `

        const response = await arcadiaAPI.GraphQL<any>(query)
        setAnimes(response.data.searchAnime.animes)
        setTotalCount(response.data.searchAnime.total)
    }

    const handlePageChange = (direction: 'prev' | 'next') => {
        if (direction === 'next') {
            FetchAnime(currentPage + 1)
            setCurrentPage((prev) => prev + 1)
        } else {
            console.log('Going previous')
            setCurrentPage((prev) => prev + -1)
            FetchAnime(currentPage - 1)
        }
    }

    return (
        <div id="page-miru-rankings">
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
                    animes.length != 0 ?
                        animes.map((anime: any, idx: number) => (
                            <DetailMediaCard
                                key={idx}
                                href={`/miru/anime/${anime.id}/${anime.slug}`}
                                title={anime.title}
                                summary={anime.summary}
                                users={anime.users}
                                score={anime.score}
                                src={`/storage/miru/${anime.id}.jpg`}
                                franchise={anime.franchise}
                            />
                        ))
                    :
                        <></>
                }
            </div>
        </div>
    )
}