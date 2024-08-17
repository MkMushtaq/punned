import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    const supabase = createClient();
    const { post_id, user_id } = await req.json();


    // insert into supabase upvote table
    const { data, error } = await supabase
        .from('upvote')
        .insert({
            post_id: post_id,
            user_id: user_id
        })
    
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }

    // increment the count in posts table by 1

    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .eq('id', post_id)
        .single();
    
    
    const updatedResp = await supabase
        .from('posts')
        .update({ count: 20 })
        .eq('id', post_id).select();

    if (posts) {
        const response = await supabase
            .from('posts')
            .update({ count: posts.count + 1 })
            .eq('id', post_id)
    }
    
    return new Response("ok")
}

export async function DELETE(req: Request) { 
    const supabase = createClient();

    // delete from supabase upvote table
    const { post_id, user_id } = await req.json();
    const { data, error } = await supabase
        .from('upvote')
        .delete()
        .eq('post_id', post_id)
        .eq('user_id', user_id)
        
    // decrement the count in posts table by 1
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .eq('id', post_id)
        .single();

    if (posts) {
        const { data: updated } = await supabase
            .from('posts')
            .update({ count: Math.max(0, posts.count - 1) })
            .eq('id', post_id)
            .single();
    }

    return new Response(JSON.stringify(data))

}