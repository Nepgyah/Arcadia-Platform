import { CreateErrorToaster, CreateSuccessToaster } from "../toasterCreator";
import { APIResponse } from "./baseAPI";

// Helper funtion centralize handling server actions and raise proper toast notifications
export default async function ActionHandler<T extends APIResponse>(
    action: () => Promise<T>,
    showSuccessMessage: boolean = false
) : Promise<T | null> {
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

        return null
    }
}