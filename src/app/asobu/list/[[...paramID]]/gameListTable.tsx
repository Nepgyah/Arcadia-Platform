import { GameListEntry, GameListEntryStatus } from "@/types/asobu";
import { useContext } from "react";
import { IconButton, Table } from "@chakra-ui/react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import Date from "@/lib/helper/date";
import { UserOwnPageContext } from "@/contexts/usersOwnPage";

export default function GameListTable({
        list,
        listType,
        handleOpenPopup,
    } : {
        list: GameListEntry[],
        listType: GameListEntryStatus ,
        handleOpenPopup: (listType: GameListEntryStatus, entry_id: number) => void,
    }) {

    const isUsersOwnPage = useContext(UserOwnPageContext);

    return (
        <Table.ScrollArea>
            <Table.Root size={"lg"} className="arcadia-table">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>#</Table.ColumnHeader>
                        <Table.ColumnHeader width={'40%'}>Title</Table.ColumnHeader>
                        <Table.ColumnHeader>Score</Table.ColumnHeader>
                        <Table.ColumnHeader>Start Date</Table.ColumnHeader>
                        <Table.ColumnHeader>End Date</Table.ColumnHeader>
                        {
                            isUsersOwnPage &&
                            <>
                                <Table.ColumnHeader>Note</Table.ColumnHeader>
                                <Table.ColumnHeader>Action(s)</Table.ColumnHeader>
                            </>
                        }
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        list ?
                            list.length != 0 ?
                                list.map((entry: GameListEntry, idx: number) => (
                                    <Table.Row key={idx}>
                                        <Table.Cell>
                                            {idx + 1}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link href={`/asobu/game/${entry.game.id}/${entry.game.slug}`} className="hover-underline">
                                                {entry.game.title}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>{entry.score ? entry.score : '--'}</Table.Cell>
                                        <Table.Cell>{entry.startPlayDate ? <Date dateString={entry.startPlayDate}/>  : "--"}</Table.Cell>
                                        <Table.Cell>{entry.endPlayDate ? <Date dateString={entry.endPlayDate}/>  : "--"}</Table.Cell>
                                        {
                                            isUsersOwnPage &&
                                            <>
                                                <Table.Cell>{entry.note}</Table.Cell>
                                                <Table.Cell>
                                                    <IconButton onClick={() => handleOpenPopup(listType, entry.id)}>
                                                        <Trash2 />
                                                    </IconButton>
                                                </Table.Cell>
                                            </>
                                        }
                                    </Table.Row>
                                ))
                            :
                                <Table.Row>
                                    <Table.Cell colSpan={7}> No Games Here!</Table.Cell>
                                </Table.Row>
                        :
                            <Table.Row>
                                <Table.Cell colSpan={7}>Loading</Table.Cell>
                            </Table.Row>
                    }
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    )       
}