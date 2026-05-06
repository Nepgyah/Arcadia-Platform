import Link from "next/link"
import { notFound } from "next/navigation"

import SetBreadcrumbs from "@/components/ui/breadcrumbs/setBreadcrumbs"
import { Avatar } from "@chakra-ui/react"
import { Book, Gamepad2, Ticket, Tv } from "lucide-react"

import Header from "@/components/ui/headers/header"
import StatCard from "@/components/shared/statsCard/statCard"
import { arcadiaAPI } from "@/lib/api/arcadiaAPI"
import { Tooltip } from "@/components/ui/tooltip"
import { User } from "@/types/user"

import "@/styles/pages/_profile.scss";

export default async function Page(
    {params}:{params: Promise<{ id: string, username: string}>}
) {
    const { id, username } = await params
    const user = await FetchUser(id)

    if (!user) notFound();
    
    return (
        <div id="page-profile" className="page-content default-schema">
            <SetBreadcrumbs breadcrumbs={['Profile', user.username]} />
            <div className="two-column">
                <div id="detail">
                    <div id="profile-card" className="card shadow border-radius-md">
                        <img id="user-background" src="/storage/preset-profile-bgs/default.jpg" alt="" />
                        <div id="profile-card-info">
                            <Avatar.Root id="user-pic">
                                <Avatar.Image src={`/storage/preset-profile-pics/${user.picturePreset}.webp`} />
                            </Avatar.Root>
                            <p id="username" className="txt-lg bold">{user.username}</p>
                        </div>
                    </div>
                </div>
                <div id="overview">
                    <div id="stats">
                        <Header text="Stats" />
                        <div className="container">
                            <Link href={`/miru/list/${user.id}`}>
                                <Tooltip
                                    content={`View ${user.username}'s anime list`}
                                >
                                    <StatCard
                                        icon={Tv}
                                        label="Anime Watched"
                                        value={user.listData.anime}
                                    />
                                </Tooltip>
                            </Link>
                            <StatCard
                                icon={Book}
                                label="Manga Read"
                                value={user.listData.manga}
                            />
                            <StatCard
                                icon={Gamepad2}
                                label="Games Played"
                                value={user.listData.games}
                            />
                            <StatCard
                                icon={Ticket}
                                label="Events Attended"
                                value={0}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function FetchUser(userId: string) {
    const query =
    `
    query {
        User(userId: ${userId}){
            id,
            username,
            picturePreset,
            listData
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<{ data: { User: User}}>(query)
    return response.data.User
}