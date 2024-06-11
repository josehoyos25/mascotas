import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

const prisma = new PrismaClient();

export async function GET(req, {params}){
    try {
        let id = Number(params.id);
        const resp = await prisma.mascota.findUnique({
            where: {id: id},
            include : {
                fk_race: true,
                fk_category: true,
                fk_gender: true,
            }
        })
        if (!result) {
            return new NextResponse("mascota not found", {status: 404})
        }
        return new Response(JSON.stringify(resp),
    {headers: {'Content-Type': 'application/json'},
    status: 200});
    } catch (error) {
        console.log(error);
    }
}
export async function DELETE(req, {params}){
    try {
        let id = Number(params.id);
        const resp = await prisma.category.delete({
            where: {id: id},
        })
        return new Response(JSON.stringify({message: error}),
    {headers: {'Content-Type': 'application/json'},
    status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: error}),
    {headers: {'Content-Type': 'application/json'},
    status: 500});
    }
}
export async function PUT(req, {params}) {
    try {
        let id = Number(params.id);
        const {name, race_id, category_id, photo, gender_id} = await req.json();
        const resp = await prisma.mascota.update(
            {
                where: {id: id},
                data: {name, race_id, category_id, photo, gender_id}
            })
            return new Response(JSON.stringify({message: 'Se actualizo con exito', category: resp}),
        {headers: {'Content-Type': 'application/json'},
        status: 200
        });
    } catch (error) {
        return Response.json({message: error})
    }
}