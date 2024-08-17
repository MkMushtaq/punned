'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState, type SVGProps } from 'react';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import { ArrowUpCircleIcon as ArrowOutlineIcon } from '@heroicons/react/24/outline'
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
export function BxUpvote(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"></path></svg>);
}

function getTimePassedSince(timestamp: string): string {
    const now = new Date();
    const past = new Date(timestamp);

    // Calculate differences
    const diffInMs = now.getTime() - past.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30); // Rough estimate
    const diffInYears = Math.floor(diffInDays / 365); // Rough estimate

    if (diffInYears > 0) {
        return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    } else if (diffInMonths > 0) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}

{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg> */}

const Upvote: React.FC<{ post: any, user_id: string, postUpvoted: boolean, setPostUpvoted: any, setPostUpvoteCount: any }> = ({ post, user_id, postUpvoted, setPostUpvoted, setPostUpvoteCount }) => {
    const router = useRouter();

    const handleClick = async () => {
        if (!user_id) {
            router.push('/login');
            return;
        }
        if (!postUpvoted) {
            await fetch('/api/upvote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_id: post.id,
                    user_id: user_id
                })
            })

            setPostUpvoteCount((upvoteCount: number) => upvoteCount + 1)

            return
        }

        await fetch('/api/upvote', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: post.id,
                user_id: user_id
            })
        })
        setPostUpvoteCount((upvoteCount: number) => upvoteCount - 1)

    }



    if (postUpvoted) {

        return (<ArrowUpCircleIcon cursor="pointer" onClick={() => {

            handleClick()
            if (user_id) {
                setPostUpvoted(false)
            }
        }} className="w-10 h-10" />)
    }
    return (<ArrowOutlineIcon cursor="pointer" onClick={() => {
        handleClick()
        if (user_id) {
            setPostUpvoted(true)
        }
    }} className="w-10 h-10" />)
}

const PostCard: React.FC<{ post: any }> = ({ post }) => {
    // get current user id
    const { isAuthenticated, user, loading: authLoading, accessToken } = useAuth();
    const [postUpvoted, setPostUpvoted] = useState<boolean>(false);
    const [postUpvoteCount, setPostUpvoteCount] = useState<number>(post?.count ?? 0);

    useEffect(() => {
        if (post && user) {
            // check if current user is in upvoted array of post
            setPostUpvoted(post.upvote.map((up: any) => up.user_id).includes(user.id) ? true : false);
            setPostUpvoteCount(post?.count ?? 0);
        }

    }, [post, user]);

    return (
        <div className="flex gap-4">
            <div>
                <Avatar>
                    <AvatarImage src="./images/profile" />
                    <AvatarFallback className="text-black">{post.author_name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col gap-2 md:w-8/12 lg:w-6/12 sm:w-full">
                <div className="flex gap-2 items-center">
                    <div className="my-auto">{post.author_name}</div>
                    <div>.</div>
                    <div className="text-muted-foreground">{getTimePassedSince(post.created_at.toString())}</div>
                </div>
                <div className="flex gap-2 items-center w-full justify-between">
                    <div className=" bg-black h-auto min-w-10 whitespace-pre-wrap rounded-lg px-4 py-6">
                        {post.content}
                    </div>
                    <div className="flex flex-col items-center gap-[4px]">
                        <Upvote user_id={user?.id} post={post} postUpvoted={postUpvoted} setPostUpvoted={setPostUpvoted} setPostUpvoteCount={setPostUpvoteCount} />
                        <div>{postUpvoteCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;