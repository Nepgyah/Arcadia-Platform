import { SkeletonText, Table } from "@chakra-ui/react";

export default function TableSkeleton() {
    return (
        <Table.Root size={'lg'} className="arcadia-table" style={{marginTop: '16px'}}>
            <Table.Header>
                <Table.Row>
                {
                    Array.from({length: 5}).map((_, idx) => (
                        <Table.ColumnHeader key={idx}>
                            <SkeletonText noOfLines={1} />
                        </Table.ColumnHeader>
                    ))
                }
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    Array.from({length: 7}).map((_, idx) => (
                        <Table.Row key={idx}>
                            {
                                Array.from({length: 5}).map((_, idx) => (
                                    <Table.Cell key={idx}>
                                        <SkeletonText noOfLines={1} />
                                    </Table.Cell>
                                ))
                            }
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table.Root>
    )
}