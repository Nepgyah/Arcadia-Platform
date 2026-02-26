'use client';

import React, { use, useEffect, useState } from "react";

import { Button, Field, NativeSelect } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

import { GetAnimeListEntry } from "./animeDetailQueries";
import { useUserStore } from "@/app/store/store";
import { Anime } from "@/types/miru";
import Header from "@/components/custom/header";
import { CreateNewAnimeListEntry, UpdateNewAnimeListEntry } from "./animeListMutations";


export default function AnimeListInput(
    {
        animePromise
    } : {
        animePromise: Promise<Anime>
    }
) {
    const user = useUserStore((state) => state.user)
    const anime = use(animePromise)
    const [isAnimeAlreadyListed, setIsAnimeAlreadyListed] = useState(false);
    const [status, setStatus] = useState<number>(-1)
    const [score, setScore] = useState<number>(-1)
    const [startWatchDate, setStartWatchDate] = useState<Date>();
    const [endWatchDate, setEndWatchDate] = useState<Date>()

    useEffect(() => {
        if (user && anime) {
            setIsAnimeAlreadyListed(true)
            GetAnimeListEntry(user.id, anime.id)
            .then((res) => {
                if (res != null) {
                    console.log('Setting input')
                    console.log(res)
                    setIsAnimeAlreadyListed(true)
                    setStatus(res.status)
                    setStartWatchDate(res.startWatchDate)
                    setEndWatchDate(res.endWatchDate)
                }
            })
        }
    }, [user])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        // const tempStartDate = startWatchDate ? String(startWatchDate.toISOString().split("T")[0]) : null
        // const tempEndDate = endWatchDate ? String(endWatchDate.toISOString().split("T")[0]) : null
        const details = {
            score: score == -1 ? null : score,
            currentEpisode: 0,
            startWatchDate: null,
            endWatchDate: null
        }
        if (isAnimeAlreadyListed) {
            UpdateNewAnimeListEntry(user.id, anime.id, status, details)
        } else {
            CreateNewAnimeListEntry(user.id, anime.id, status, details)
        }
    }

    return (
        <div id="anime-list-control">
            <Header text="List Control" />
            {
                !user ?
                    <p>Login to add to your anilist!</p>
                :
                <form onSubmit={handleSubmit} className="flex flex-column row-gap-md">
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
                        <Button type="submit" variant={'subtle'} className="btn-primary">
                            {
                                isAnimeAlreadyListed ? "Update" : "Add"
                            }
                        </Button>
                    </div>
                </form>
            }
        </div>
    )
}