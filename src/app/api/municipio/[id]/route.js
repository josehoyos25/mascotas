import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET (req, {params}){

    try {
    let id = Number(params.id);
    const resp = await prisma.municipio.findUnique({
        where: {id: id},
    })
    return new Response(JSON.stringify(resp),
    {headers: {'Content-Type': 'application/json'},
    status: 200
    })
} catch (error) {
    console.log(error);
}
}
export async function DELETE (req, {params}) {
    try {
    let id = Number(params.id);
    const resp = await prisma.municipio.delete({
        where: {id: id},
    })
    return new Response(JSON.stringify(resp),
    {headers: {'Content-Type': 'application/json'},
    status: 200
    })
    } catch (error) {
        return new Response(JSON.stringify({message: error}),
    {headers: {'Content-Type': 'application/json'},
    status: 500
    })
    }
}
export async function PUT(req, {params}){
    try {
        let id = Number(params.id);
        const {name} = await req.json();
        const resp = await prisma.municipio.update({
            where: {id: id},
            data: {name: name}
        })
        return new Response(JSON.stringify({message: 'Se actualizo con exito', municipio: resp}),
        {headers: {'Content-Type': 'application/json'},
        status: 200
        });
    } catch (error) {
        return Response.json({message: error})
    }
}