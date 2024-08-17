"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signInWithGoogle } from "@/lib/auth-actions";
const GoogleIcon = () => (
    <svg
        className="w-4 h-auto mr-2"
        width={46}
        height={47}
        viewBox="0 0 46 47"
        fill="none"
    >
        <path
            d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
            fill="#4285F4"
        />
        <path
            d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
            fill="#34A853"
        />
        <path
            d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
            fill="#FBBC05"
        />
        <path
            d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
            fill="#EB4335"
        />
    </svg>
)
export default function Page() {

    return (
        <div className="flex mt-20vh  mx-auto max-w-2xl flex-col gap-2 border-2 border-solid p-5 border-[#5F5F5F] rounded-xl">
            <div className="text-3xl mx-auto my-2">Login</div>
            <Button variant="outline" className="py-7 text-foreground font-light text-xl">
                <div className="flex items-center gap-2">
                    <GoogleIcon />
                    Login with Google
                </div>
            </Button>
            <Separator asChild className="my-6 bg-background">
                <div className="py-3 flex items-center text-xs text-muted-foreground uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:ms-6">
                    OR
                </div>
            </Separator>
            <Button className="py-7 font-light text-xl"
                onClick={() => {
                    signInWithGoogle();
                }}
            >
                <div className="flex items-center gap-2 text-[#212121]">
                    <GoogleIcon />
                    Sign Up with Google
                </div>
            </Button>
        </div>
    );
}