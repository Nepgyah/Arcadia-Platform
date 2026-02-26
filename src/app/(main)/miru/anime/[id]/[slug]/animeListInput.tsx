'use client';

import { useUserStore } from "@/app/store/store";
import Header from "@/components/custom/header";
import { Anime } from "@/types/miru";
import { Button, Field, NativeSelect } from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import { GetAnimeListEntry } from "./animeDetailQueries";

import { SingleDatepicker } from "chakra-dayzed-datepicker";

export default function AnimeListInput(
    {
        animePromise
    } : {
        animePromise: Promise<Anime>
    }
) {
    const user = useUserStore((state) => state.user)
    const anime = use(animePromise)
    const [status, setStatus] = useState<number>(-1)
    const [score, setScore] = useState<number>(5)
    const [startWatchDate, setStartWatchDate] = useState(new Date());
    const [endWatchDate, setEndWatchDate] = useState(new Date())

    useEffect(() => {
        if (user && anime) {
            GetAnimeListEntry(user.id, anime.id)
            .then((res) => {
                setStatus(res.status)
            })
        } else {
            console.log('NAW')
        }
    }, [user])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log('Submit')
    }

    const handleReset = () => {

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
                                <option value={1}>Actual Trash</option>
                                <option value={2}>Appaling</option>
                                <option value={3}>Very Bad</option>
                                <option value={4}>Bad</option>
                                <option value={5}>Mid</option>
                                <option value={6}>Good</option>
                                <option value={7}>Very Good</option>
                                <option value={8}>Great</option>
                                <option value={9}>Amazing</option>
                                <option value={10}>Cinema</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                    <div id="watch-dates">
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
                    </div>
                    <div id="actions">
                        <Button type="submit" variant={'subtle'} className="btn-primary">Submit</Button>
                        <Button variant={'outline'} className="bnt-secondary">Reset</Button>
                    </div>
                </form>
            }
        </div>
    )
}