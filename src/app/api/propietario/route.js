import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST (request) {
    try {
        const data = await request.json()
        const propietary = await prisma.propietario.create(({
            data: data
        }))
        return  new NextResponse(JSON.stringify(propietary), {
            headers: {"Content-Type":"application/json"},
            status: 200
        })
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}

export async function GET () {
    try {
        const propietarios = await prisma.propietario.findMany()
        return NextResponse.json({datos: propietarios}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}