import { RESTResponse } from "@/types/api";
import { arcadiaAPI } from "@/utils/api/arcadiaAPI";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await arcadiaAPI.GET<any>('asobu/export-list/')
        console.log(response.list)
        // return NextResponse.json({ message: "Success" }, { status: 200 });
        return new NextResponse(JSON.stringify(response.list, null, 2), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="game_list_export.json"',
            },
        });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}