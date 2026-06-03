'use client';

import Header from "@/components/ui/headers/header";
import { useEffect, useState } from "react";

import { Button, ButtonGroup, createListCollection, Field, IconButton, Input, NativeSelect, Pagination, Portal, Select } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import '@/styles/pages/miru/_search.scss';
import SetBreadcrumbs from "@/components/ui/breadcrumbs/setBreadcrumbs";
import React from "react";
import { FetchAnimeSearchAction } from "./actions";
import { CreateErrorToaster } from "@/lib/helper/toasterHelpers";
import { PaginationResults, SortInput } from "@/types/pagination";
import DetailMediaCard from "@/components/shared/mediaCards/detailedCard/detailedMediaCard";
import DetailMediaCardSkeleton from "@/components/shared/mediaCards/detailedCard/detailedMediaCardSkeleton";
import { AnimeFilterInput } from "@/types/miru";
import { PaginationInput } from "@/types/api";

const DEFAULT_PER_PAGE = 2
export default function Page() {

    const [loading, setLoading] = useState(true)

    const [animes, setAnimes] = useState<any[]>([]);
    const [filterInput, setFilterInput] = useState<AnimeFilterInput>({
        type: -1,
        status: -1,
        title: ""
    })
    const [sortInput, setSortInput] = useState<SortInput>({
        direction: "desc",
        category: ""
    })
    const [paginationInput, setPaginationInput] = useState<PaginationInput>({
        perPage: DEFAULT_PER_PAGE,
        targetPage: 1
    })

    const [paginationResults, setPaginationResults] = useState<PaginationResults>()

    useEffect(() => {
        SearchAnime(1)
    }, [])

    async function SearchAnime(targetPage: number) {
        const updatedPagination: PaginationInput = {
            perPage: paginationInput.perPage,
            targetPage: targetPage
        }
        const result = await FetchAnimeSearchAction(filterInput, sortInput, updatedPagination)

        if (!result.success) {
            CreateErrorToaster(result.error)
        } else {
            setLoading(false);
            setAnimes(result.data.miru.animes.results)
            setPaginationResults(result.data.miru.animes.pagination)
        }
    }

    const handlePageChange = (direction: 'prev' | 'next') => {
        const newPage = direction === 'next' ? paginationInput.targetPage + 1 : paginationInput.targetPage - 1;
        setPaginationInput((prevState) => ({
            ...prevState,
            targetPage: newPage
        }))
        SearchAnime(newPage);
    }

    const handleChangeFilter = (target: 'type' | 'status' | 'title', value: any) => {
        switch(target) {
            case 'type':
                setFilterInput((prevInput) => ({
                    ...prevInput,
                    type: value
                }))
                break;
            case 'status':
                setFilterInput((prevInput) => ({
                    ...prevInput,
                    status: value
                }))
                break;
            case 'title':
                setFilterInput((prevInput) => ({
                    ...prevInput,
                    title: value
                }))
                break;
        }
    }

    const handleReset = async () => {
        setFilterInput({
            type: -1,
            status: -1,
            title: ""
        })
        setSortInput({
            direction: "asc",
            category: ""
        })
        setPaginationInput({
            perPage: DEFAULT_PER_PAGE,
            targetPage: 1
        })
        const result = await FetchAnimeSearchAction(
            {
            type: -1,
            status: -1,
            title: ""
        },
        {
            direction: "asc",
            category: ""
        }, {
            perPage: DEFAULT_PER_PAGE,
            targetPage: 1
        })

        if (!result.success) {
            CreateErrorToaster(result.error)
        } else {
            setLoading(false);
            setAnimes(result.data.miru.animes.results)
            setPaginationResults(result.data.miru.animes.pagination)
        }
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
                            <NativeSelect.Field value={filterInput.type} onChange={(e) => handleChangeFilter('type', Number(e.target.value))}>
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
                            <NativeSelect.Field value={filterInput.status} onChange={(e) => handleChangeFilter('status', Number(e.target.value))}>
                                <option value={-1} disabled>Select Status</option>
                                <option value={0}>Not Yet Aired</option>
                                <option value={1}>Airing</option>
                                <option value={2}>Finished</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Title</Field.Label>
                        <Input 
                            value={filterInput.title} 
                            onChange={(e) => handleChangeFilter('title', e.target.value)}
                            placeholder="Uma, Fate, etc" 
                        />
                    </Field.Root>
                </div>
                <div id="sort" className="flex flex-column row-gap-md">
                    <Header text="Sort" />
                    <Field.Root>
                        <Field.Label>Category</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={sortInput.category} onChange={(e) => setSortInput((prevInput) => ({
                                ...prevInput,
                                category: e.target.value
                            }))}>
                                <option value={""} disabled>Select Category</option>
                                <option value={'score'}>Score</option>
                                <option value={'users'}>Users</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Direction</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={sortInput.direction} onChange={(e) => {
                                const direction = e.target.value as 'asc' | 'desc';

                                setSortInput((prevInput) => ({
                                    ...prevInput,
                                    direction,
                                }));
                            }}>
                                <option value={''} disabled>Select Direction</option>
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
                            <NativeSelect.Field value={paginationInput.perPage} onChange={(e) => setPaginationInput((prevInput) => ({
                                ...prevInput,
                                perPage: Number(e.target.value)
                            }))}>
                                <option value={9}>9</option>
                                <option value={15}>15</option>
                                <option value={21}>21</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                </div>
                <Button
                    className="btn-primary" 
                    onClick={() => SearchAnime(1)}
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