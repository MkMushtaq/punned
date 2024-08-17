import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
    const slug = params.slug 
    const supabase = createClient();

    const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', slug)
        .single();
    

    return new Response(JSON.stringify(data));

    
}