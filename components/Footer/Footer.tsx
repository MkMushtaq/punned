import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Footer() {
    return (
        <div className="py-3">
            <div className="flex flex-col gap-6 md:flex-row justify-between py-5">
                <div className="text-3xl">Punned</div>

                <Button className="text-md rounded-full max-w-[100px] text-[#212121]">Post</Button>
                <div>
                    <div className="text-2xl">About</div>
                    <div className="text-sm font-light">Terms & Conditions</div>
                    <div className="text-sm font-light">Privacy Policy</div>
                </div>

            </div>
            <Separator />
            <div className="flex justify-center py-2">Copyright © 2024 Punned</div>
        </div>

    );
}