'use client';

import Header from "@/components/ui/headers/header";
import { useEffect, useState } from "react";

import { Button, ButtonGroup, createListCollection, Field, IconButton, NativeSelect, Pagination, Portal, Select } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import '@/styles/pages/miru/_search.scss';
import SetBreadcrumbs from "@/components/ui/breadcrumbs/setBreadcrumbs";
import React from "react";
import { FetchAnimeSearchAction } from "./actions";
import { CreateErrorToaster } from "@/lib/helper/toasterHelpers";
import { PaginationResults } from "@/types/pagination";
import DetailMediaCard from "@/components/shared/mediaCards/detailedCard/detailedMediaCard";
import DetailMediaCardSkeleton from "@/components/shared/mediaCards/detailedCard/detailedMediaCardSkeleton";

export default function Page() {

    const [loading, setLoading] = useState(true)

    const [animes, setAnime] = useState<any[]>([]);
    const [mediaType, setMediaType] = useState(-1)
    const [mediaStatus, setMediaStatus] = useState(-1)
    const [mediaTitle, setMediaTitle] = useState("")

    const [sortCategory, setSortCategory] = useState("")
    const [sortDirection, setSortDirection] = useState<string>('desc')

    const [perPage, setPerPage] = useState<number>(15)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalCount, setTotalCount] = useState<number>(0)

    const [paginationResults, setPaginationResults] = useState<PaginationResults>()

    useEffect(() => {
        SearchAnime(1)
    }, [])

    async function SearchAnime(currentPage: number) {
        const result = await FetchAnimeSearchAction(
            mediaType,
            mediaStatus,
            mediaTitle,
            sortCategory,
            sortDirection,
            {
                perPage: perPage,
                currentPage: currentPage
            }
        )

        if (!result.success) {
            CreateErrorToaster(result.error)
        } else {
            setLoading(false);
            setAnime(result.data.searchAnime.animes)
            setPaginationResults(result.data.searchAnime.paginationResults)
        }
    }

    const handlePageChange = (direction: 'prev' | 'next') => {
        if (direction === 'next') {
            SearchAnime(currentPage + 1)
            setCurrentPage((prev) => prev + 1)
        } else {
            setCurrentPage((prev) => prev + -1)
            SearchAnime(currentPage - 1)
        }
    }

    const handleChangeFilter = (target: 'type' | 'status' | 'title', value: any) => {
        switch(target) {
            case 'type':
                setMediaType(value)
                break;
            case 'status':
                setMediaStatus(value)
                break;
            case 'title':
                setMediaTitle(value)
                break;
        }
    }

    const handleReset = () => {
        setMediaType(-1)
        setMediaStatus(-1)
        setMediaTitle("")
        setSortCategory("")
        setSortDirection("asc")
    }

    return (
        <div id="page-miru-search">
            <SetBreadcrumbs breadcrumbs={['Miru', 'Search']} />
            <div id="controls" className="flex flex-column row-gap-md">
                <div id="filters" className="flex flex-column row-gap-md">
                    <Header text="Filters" />
                    <Field.Root>
                        <Field.Label>Type</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={mediaType} onChange={(e) => handleChangeFilter('type', Number(e.target.value))}>
                                <option value={-1} disabled>Select Type</option>
                                <option value={0}>Tv</option>
                                <option value={1}>Movie</option>
                                <option value={2}>OVA</option>
                                <option value={3}>ONA</option>
                                <option value={4}>Web</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Airing Status</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={mediaStatus} onChange={(e) => handleChangeFilter('status', Number(e.target.value))}>
                                <option value={-1} disabled>Select Status</option>
                                <option value={0}>Not Yet Aired</option>
                                <option value={1}>Airing</option>
                                <option value={2}>Finished</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                </div>
                <div id="sort" className="flex flex-column row-gap-md">
                    <Header text="Sort" />
                    <Field.Root>
                        <Field.Label>Category</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={sortCategory} onChange={(e) => setSortCategory(e.target.value)}>
                                <option value={""} disabled>Select Category</option>
                                <option value={'score'}>Score</option>
                                <option value={'users'}>Users</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Direction</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                                <option value={""} disabled>Select Direction</option>
                                <option value={'asc'}>Ascending</option>
                                <option value={'desc'}>Descending</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                </div>
                <div id="others" className="flex flex-column row-gap-md">
                    <Header text="Others" />
                    <Field.Root>
                        <Field.Label>Per Page</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                                <option value={9}>9</option>
                                <option value={15}>15</option>
                                <option value={21}>21</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                </div>
                <Button
                    className="btn-primary" 
                    onClick={() => SearchAnime(currentPage)}
                >
                    Search
                </Button>
                <Button 
                    variant={'ghost'}
                    onClick={() => handleReset()}
                >
                    Reset
                </Button>
            </div>
            <div>
                <div id="pagination">
                    <Pagination.Root count={paginationResults?.totalItems} pageSize={paginationResults?.perPage} defaultPage={1} maxW="240px">
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
                <div id="results">
                    {
                        loading ?
                            <Skeleton />
                        :
                            animes.length != 0 ?
                                animes.map((anime: any, idx: number) => (
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