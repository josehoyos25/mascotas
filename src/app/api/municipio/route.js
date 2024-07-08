import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST (request) {
    try {
        const data = await request.json()
        const munici = await prisma.municipio.create(({
            data: data
        }))
        return  new NextResponse(JSON.stringify(munici), {
            headers: {"Content-Type":"application/json"},
            status: 200
        })
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}

export async function GET () {
    try {
        const municipios = await prisma.municipio.findMany()
        return NextResponse.json({datos: municipios}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}