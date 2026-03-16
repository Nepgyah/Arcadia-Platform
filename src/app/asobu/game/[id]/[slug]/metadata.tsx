import Header from "@/components/custom/header";
import SocialsSkeleton from "@/components/media/socials/skeleton";
import SocialsList from "@/components/media/socials/socials";
import { AsobuGame } from "@/types/asobu";
import { Franchise } from "@/types/base";
import { Suspense, use } from "react";

export default function Metadata(
    {
        game, franchisePromise
    } : {
        game: AsobuGame,
        franchisePromise: Promise<any>
    }
) {
    return (
        <div id="metadata-column">
            <div>
                <Header text="Socials" />
                <Suspense fallback={<SocialsSkeleton />}>
                    <SocialMedia franchisePromise={franchisePromise} />
                </Suspense>
            </div>
        </div>
    )
}

function SocialMedia({franchisePromise}:{franchisePromise:Promise<Franchise>}) {
    const franchise = use(franchisePromise)

    if (franchise.socials) {
        return (
            <SocialsList socials={franchise.socials} />
        )
    } else {
        return <p className="clr-txt-fadded">No socials found</p>
    }
}