'use server';

import { arcadiaAPI } from "@/lib/api/baseAPI";

interface testActionResponse {
    results: {
        'status': string,
        'checks': {
            'db': string
        }
    }
}
export default async function testAction() {
    return await arcadiaAPI.FETCH<testActionResponse>(
        'health-check/',
        'GET'
    )
}