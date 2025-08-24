// src/app/api/supa/update/[id]/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface UpdateContext {
    params: Promise<{ id: string }>;
}

export const PUT = async (req: NextRequest, context: UpdateContext) => {

    // 1. Hent id fra route params
    const { id } = await context.params;
    const numericId = Number(id);

    if (!numericId) {
        return NextResponse.json(
            { error: "ID mangler eller er ugyldigt" },
            { status: 400 }
        );
    }

    // 2. Hent data fra request body
    const body = await req.json();

    console.log(body);


    const fields = ["name", "lastname"]; // Felter der må opdateres
    const updateData: Record<string, unknown> = {}; // Objekt til opdateringsdata



    if (body) { // Tjekker om der er data i request body
        fields.forEach((field) => { // Gennemgår hvert felt i listen
            if (body[field] !== undefined) { // Hvis feltet findes i body
                updateData[field] = body[field]; // Tilføj feltet til updateData
            }
        });
    }

    console.log("Update data:", updateData);

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ error: "Ingen felter at opdatere" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("testarea")
        .update(updateData) // <--- IKKE { updateData }
        .eq("id", numericId)
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: `Item ${numericId} blev opdateret`, data });
};
