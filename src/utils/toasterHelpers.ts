import { toaster } from "@/components/ui/toaster";

export function CreateErrorToaster(message: any) {
    toaster.create({
        title: message,
        type: 'error'
    })
}

export function CreateWarningToaster(message: string) {
    toaster.create({
        title: message,
        type: 'info'
    })
}

export function CreateSuccessToaster(message: string) {
    toaster.create({
        title: message,
        type: 'success'
    })
}