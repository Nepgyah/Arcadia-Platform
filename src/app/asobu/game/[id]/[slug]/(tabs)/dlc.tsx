import { Card, Image } from "@chakra-ui/react"
import { use } from "react"

export default function DLCTab(
    {
        dlcPromise, gameID
    } : {
        dlcPromise: Promise<any[]>,
        gameID: string
    }
) {
    const dlcList = use(dlcPromise)

    if (dlcList.length) {
        return (
            <div id="dlc-tab">
                {
                    dlcList.map((dlc: any, idx: number) => (
                        <Card.Root className="card" key={idx}>
                            <Image 
                                src={`/storage/asobu/${gameID}/dlc/${dlc.id}.jpg`}
                                alt={dlc.title}
                            />
                            <Card.Body gap={2}>
                                <Card.Title>{dlc.title}</Card.Title>
                                <Card.Description>{dlc.description}</Card.Description>
                            </Card.Body>
                        </Card.Root>
                    ))
                }
            </div>
        )
    } else {
        return (
            <p>No DLCs found</p>
        )
    }
}