'use client';

import { toaster } from "@/components/ui/toaster";


export function CreateSuccessToaster(message: string) {
    queueMicrotask(() => {
        toaster.create({
            title: message,
            type: 'success'
        })
    })
}

export function CreateErrorToaster(message: string) {
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
            type: 'warning'
        })
    })
}


export function CreateInfoToaster(message: string) {
    queueMicrotask(() => {
        toaster.create({
            title: message,
            type: 'info'
        })
    })
}
