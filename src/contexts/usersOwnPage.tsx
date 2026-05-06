import { useUserStore } from "@/app/store/userStore";
import React, { createContext, use, useEffect, useState } from "react";

export const UserOwnPageContext = createContext(false);

export default function UserOwnPageContextWrapper(
    {
        children,
        userID,
    } : {
        children:React.ReactNode,
        userID: number
    }) {
    const user = useUserStore((state) => state.user)
    const userStatus = (userID == undefined && (user != undefined && user != null))

    return (
        <UserOwnPageContext.Provider value={userStatus}>
            {children}
        </UserOwnPageContext.Provider>
    )
}