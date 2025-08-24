import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

interface QueryContext {
    params: Promise<{ id: string }>; //Next leverer altid route params som strings.
}

const supabase = createClient( //kalder vores Supabase client

    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const GET = async (_req: NextRequest, context: QueryContext) => { // du kan også kalde den route hvis det giver bedre mening for dig

    //route.params er et objekt
    const { id } = await context.params; //destructurerer objektet, 

     if (!id) {
        return NextResponse.json(
            { error: "ID mangler eller er ugyldigt" },
            { status: 400 }
        );
    }

    // hvis du har brug for det som numerisk værdi
/*     const { id } = await context.params;
const numericId = Number(id); // eller parseInt(id)   */   

    //or

    /* const params = await context.params;
    const id = params.id; */

    //or

    //const id = (await context.params).id;

    //Supabase API
    const { data, error } = await supabase
        .from('testarea')
        .select('*')
        .eq('id', id) 

    if (error == null) return NextResponse.json({ data });

    return NextResponse.json({ error: error.message })

}
