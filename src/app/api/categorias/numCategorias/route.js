import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Obtener todas las categorías junto con el conteo de mascotas
        const categorias = await prisma.category.findMany({
            include: {
                _count: {
                    select: { pets: true }
                }
            }
        });

        // Transformar el resultado para obtener la estructura deseada
        const resultado = categorias.map(categoria => ({
            categoria: categoria.name,
            cantidadDeMascotas: categoria._count.pets
        }));

        return NextResponse.json({ datos: resultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
