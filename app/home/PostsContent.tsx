import React, { useEffect, useState } from "react"
import PostCard from "./PostCard"
import { PostSkeleton } from "@/components/PostSkeleton"

const PostContent: React.FC = () => {
    const [posts, setPosts] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            const response = await fetch(`/api/post`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        }
        getPosts();

    }, []);
    if (loading) {
        return (<div className="flex flex-col gap-[20px]">
            {[...Array(5)].map((_, i) =>
                <PostSkeleton key={i} />
            )}
        </div>)
    }
    return (<>
        {posts?.map((post: any) => <PostCard key={post.id} post={post} />)
        }
    </>)
}

export default React.memo(PostContent);

