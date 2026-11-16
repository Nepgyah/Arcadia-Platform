'use server';

import { arcadiaAPI } from "@/lib/api/baseAPI";
import { Franchise } from "@/types/base";

export interface GetFranchiseResponse {
    base: {
        franchise: Franchise
    }
}

export default async function GetFranchiseAction(id: number) {
    const query = `
    query ($franchiseID: Int!) {
        base {
            franchise(pk: $franchiseID) {
                name,
                slug,
                coverImage,
                socials
            }
        }
    }
    `

    const variables = { franchiseID: Number(id)}

    const response = await arcadiaAPI.GRAPHQL<GetFranchiseResponse>(query, variables)
    return response
}