import { Building, Building2, LucideIcon } from "lucide-react";

import './franchiseCard.scss';
import { Franchise, SocialMediaType } from "@/types/base";
import EmptyData from "@/components/data/emptyData";
import { GetFranchiseResponse } from "@/actions/franchise/getFranchiseAction";
import { use } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { SNSIcon } from "@/components/ui/SNSIcon";


export default function FranchiseCard(
    {
        franchisePromise
    } : {
        franchisePromise : Promise<GetFranchiseResponse> | null
    }
) {

     if (!franchisePromise) {
        return (
            <div className="franchise-card arc-card">
                <EmptyData icon={Building} title="No Franchise Found" />
            </div>
        );
    }

    const franchise = use(franchisePromise).base.franchise;

    return (
        <div className="franchise-card arc-card has-mask">
            <Content franchise={franchise} />
        </div>
    );
}

function Content({franchise}:{franchise: Franchise}) {

    return (
        <>  
            <img className="franchise-card__background" src={franchise.coverImage} alt="" />
            <div className="mask"/>
            <div className="franchise-card__text">
                <div className="franchise-card__name">{franchise.name}</div>
                <div className="franchise-card__socials">
                     {
                        Object.entries(franchise.socials).map(([platform, social]) => (
                        <Tooltip showArrow key={platform} content={social.handle}>
                            <a href={social.url} target="_blank">
                                <div className={`franchise-card__sns franchise-card__sns--${platform} box-shadow on-hover on-hover--cursor on-hover--grow`}>
                                    <SNSIcon platform={platform as SocialMediaType}  />
                                </div>
                            </a>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </>
    )
}