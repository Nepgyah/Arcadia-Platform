'use client';

import { toaster } from "@/components/ui/toaster";

export function CreateErrorToaster(message: any) {
    queueMicrotask(() => {
        toaster.create({
            title: message,
            type: 'error'
        })
    })
}

export function CreateWarningToaster(message: string) {
    queueMicrotask(() => {
        toaster.create({
            title: message,
            type: 'info'
        })
    })
}

export function CreateSuccessToaster(message: string) {
    queueMicrotask(() => {
        toaster.create({
            title: message,
            type: 'success'
        })
    })
}