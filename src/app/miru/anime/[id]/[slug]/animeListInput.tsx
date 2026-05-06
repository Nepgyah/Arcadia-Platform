'use client';

import React, { use, useEffect, useState } from "react";

import { Button, Field, NativeSelect } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

import { useUserStore } from "@/app/store/store";
import { Anime } from "@/types/miru";
import Header from "@/components/ui/headers/header";
import { toaster } from "@/components/ui/toaster";
import { arcadiaAPI } from "@/lib/api/arcadiaAPI";
import { AddAnimeListEntryAction, FetchAnimeListEntryAction, UpdateAnimeListEntryAction } from "./actions";


export default function AnimeListInput(
    {
        anime
    } : {
        anime: Anime
    }
) {
    const user = useUserStore((state) => state.user)
    const [isAnimeAlreadyListed, setIsAnimeAlreadyListed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<number>(-1)
    const [score, setScore] = useState<number>(-1)

    useEffect(() => {
        const fetchEntry = async (animeID: number) => {
            const result = await FetchAnimeListEntryAction(animeID)
            
            if (!result.success) {
                toaster.create({
                    title: result.error,
                    type: 'error'
                })
            } else {
                if (result.data) {
                    setIsAnimeAlreadyListed(true)
                    setStatus(result.data.getAnimeListEntry.status)
                    setScore(result.data.getAnimeListEntry.score ? result.data.getAnimeListEntry.score : -1)
                }
            }
        }
        if (user && anime) {
            fetchEntry(anime.id)
        }
    }, [user])

    const formatDetails = () => {
        return {
            score: score == -1 ? null : score,
            currentEpisode: 0,
            startWatchDate: null,
            endWatchDate: null
        }
    }

    const handleNewEntry = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        if (status == -1) {
            toaster.create({
                title: 'Select a status',
                type: 'info'
            })
        } else {
            const details = formatDetails()
            const result = await AddAnimeListEntryAction(anime.id, status, details)
            
            if (!result.success) {
                toaster.create({
                    title: result.error,
                    type: 'error'
                })
            } else {
                toaster.create({
                    title: 'Entry added successfully',
                    type: 'success'
                })
                setLoading(false)
            }
        }
    }

    const handleUpdateEntry = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)

        const details = formatDetails()
        const result = await UpdateAnimeListEntryAction(anime.id, status, details)
            
        if (!result.success) {
            toaster.create({
                title: result.error,
                type: 'error'
            })
        } else {
            toaster.create({
                title: 'Entry updated successfully',
                type: 'success'
            })
            setLoading(false)
        }
    }
    return (
        <div id="anime-list-control">
            <Header text="List Control" />
            {
                !user ?
                    <p>Login to add to your anilist!</p>
                :
                <form className="flex flex-column row-gap-md">
                    <Field.Root>
                        <Field.Label>Status</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={status} onChange={(e) => setStatus(Number(e.target.value))}>
                                <option value={-1} disabled>Select Status</option>
                                <option value={0}>Watching</option>
                                <option value={1}>Completed</option>
                                <option value={2}>Plan to Watch</option>
                                <option value={3}>On Hold</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Score</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={score} onChange={(e) => setScore(Number(e.target.value))}>
                                <option value={-1} disabled>Select Score</option>
                                <option value={1}>1 - Actual Trash</option>
                                <option value={2}>2 - Appaling</option>
                                <option value={3}>3 - Very Bad</option>
                                <option value={4}>4 - Watchable Trash</option>
                                <option value={5}>5 - Mid</option>
                                <option value={6}>6 - Good Trash</option>
                                <option value={7}>7 - Actually Good</option>
                                <option value={8}>8 - Great</option>
                                <option value={9}>9 - Amazing</option>
                                <option value={10}>10 - Cinema</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                    {/* <div id="watch-dates">
                        <Field.Root>
                            <Field.Label>Start Watch Date</Field.Label>
                            <SingleDatepicker
                                name="date-input"
                                date={startWatchDate}
                                onDateChange={setStartWatchDate}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>End Watch Date</Field.Label>
                            <SingleDatepicker
                                name="date-input"
                                date={endWatchDate}
                                onDateChange={setEndWatchDate}
                            />
                        </Field.Root>
                    </div> */}
                    <div id="actions">
                        {
                            isAnimeAlreadyListed ?
                                <Button 
                                    onClick={(e) => handleUpdateEntry(e)}
                                    loading={loading}
                                    variant={'subtle'} 
                                    className="btn-primary"
                                >
                                    Update
                                </Button>
                            :
                                <Button 
                                    onClick={(e) => handleNewEntry(e)} 
                                    loading={loading}
                                    variant={'subtle'} 
                                    className="btn-primary"
                                >
                                    Add
                                </Button>
                        }
                    </div>
                </form>
            }
        </div>
    )
}