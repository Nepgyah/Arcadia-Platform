import { toaster } from "@/components/ui/toaster";

export function CreateErrorToaster(message: any) {
    toaster.create({
        title: message,
        type: 'error'
    })
}