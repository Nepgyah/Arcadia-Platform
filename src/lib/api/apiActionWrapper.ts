'use client';

import { CreateErrorToaster, CreateSuccessToaster } from "../toasterCreator";

interface ActionResponse {
    message: string
}

// Helper funtion centralize handling server actions and raise proper toast notifications
export default async function ActionHandler<T extends ActionResponse>(
    action: () => Promise<T>,
    showSuccessMessage: boolean = false
) {
    try {
        const response = await action();

        if (showSuccessMessage) {
            CreateSuccessToaster(response.message);
        }

        return response;
    } catch (error: unknown) {
        CreateErrorToaster(
            error instanceof Error ? error.message : String(error)
        );
    }
}