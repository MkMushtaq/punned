import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
        const jwtToken = req.headers.get('Authorization')?.split(' ')[1];
        if (!jwtToken) { 
            return new Response('Unauthorized', { status: 401 });
        }

        const supabase = createClient();

        const userData = await supabase.auth.getUser(jwtToken as string);
        if (!userData) {
            return new Response('Unauthorized', { status: 401 });
        }
        
        

        const { authorId: author_id, content } = await req.json();
           if (author_id !== userData.data.user?.id) {
            return new Response('Unauthorized', { status: 401 });
        }
        

        // insert into supabase posts table
        const { data, error } = await supabase.from('posts').insert([{ author_id, content, created_at: new Date(), updated_at: new Date() }]);
        if (error) {
            return new Response(JSON.stringify(error), { status: 500 });
        }

        // increment the count of posts in posts table by 
        return new Response('OK');
}

export async function GET(request: Request & { query: { user_id: string } }) { 

        const supabase = createClient();

        const { data, error } = await supabase
        .from('posts')
                .select('*, upvote(*)')
                .order('created_at', { ascending: true });
        return new Response(JSON.stringify(data));

}