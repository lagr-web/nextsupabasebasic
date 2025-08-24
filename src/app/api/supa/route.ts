import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
//import { createServerClient } from '@supabase/ssr';

const supabase = createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


export const GET = async (reg:NextRequest) =>{

const {data, error} = await supabase

.from('testarea')
.select(`id, name, lastname`)
.order('id', {ascending:false})

console.log({data});

 if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

return NextResponse.json({data});


}