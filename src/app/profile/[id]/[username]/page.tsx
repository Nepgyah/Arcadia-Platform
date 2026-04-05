import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs"
import { User } from "@/types/user"
import { arcadiaAPI } from "@/utils/api/arcadiaAPI"
import { Avatar } from "@chakra-ui/react"

export default async function Page(
    {params}:{params: Promise<{ id: string, username: string}>}
) {
    const { id, username } = await params
    const user = await FetchUser(id)
    return (
        <div id="page-profile" className="page-content">
            <SetBreadcrumbs breadcrumbs={['Profile', user.username]} />
            <h1>{user.username}</h1>
            <Avatar.Root>
                <Avatar.Image src={`/storage/preset-profile-pics/${user.picturePreset}.webp`} />
            </Avatar.Root>
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
            picturePreset
        }
    }
    `

    const response = await arcadiaAPI.GraphQL<{ data: { User: User}}>(query)
    return response.data.User
}