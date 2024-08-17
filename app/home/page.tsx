'use client'
import { Separator } from "@/components/ui/separator";
import PostsContent from "./PostsContent";
import React from "react";


const Page = () => {

    return (
        <div>
            <div className="inline-block">
                <div className="text-4xl font-bold mt-40">See who&apos;s puns are punning</div>
                <Separator className="my-5" />
            </div>
            <div className="flex flex-col gap-2">
                <PostsContent />
            </div>
        </div>
    );
}

export default React.memo(Page);