import { Skeleton } from "@/components/ui/skeleton"

export function PostSkeleton() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-24 w-96" />
            </div>
        </div>
    )
}
