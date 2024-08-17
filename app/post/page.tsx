'use client'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "../context/AuthProvider";


export default function Page() {
    const { user, accessToken } = useAuth();
    const [loading, setLoading] = useState(false);

    const [content, setContent] = useState('');

    const sendPost = async () => {
        setLoading(true)

        try {
            if (!content) {
                toast.error('Joke cannot be empty!');
                return;
            }
            // make a post request to 'api/post'
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    authorId: user?.id,
                    content: content,
                })
            })
            toast.success('Joke posted!');

        } catch (error) {
            console.log(error)
            toast.error('Could not post your joke!');
        } finally {
            setLoading(false)
        }

    }


    return (
        <div className="flex flex-col gap-16 mt-24">
            <div className="text-4xl font-bold"> What is your mind tingling?</div>
            <div className="text-2xl flex flex-col gap-4 px-4 py-8 rounded-md border border-solid p-5 border-[#5F5F5F] ">
                <Textarea onChange={(e) => setContent(e.target.value)} className="focus:outline-none focus:ring-0 focus:ring-white text-2xl placeholder:text-grey6 border-solid p-5 border-[#5F5F5F] h-auto rounded-md" placeholder="Type your joke here." />
                <div className="flex">
                    <Button disabled={loading} className="mt-2 ml-auto text-[#212121]" onClick={sendPost}>{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Post'}</Button>
                </div>
            </div>
        </div>
    );
}