'use client'
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-8 my-20">
      <div className="text-3xl md:text-6xl font-bold text-center ">
        Come hangout with jokes that are bound to make you happy!
      </div>
      <div className="text-md md:text-lg font-thin text-center">
        Laughter is the only medicine you will ever need
      </div>
      <Button className="text-md rounded-full min-w-[100px] text-[#212121]" onClick={() => { router.push('/post') }} >Post</Button>
    </div>
  );
}

const AboutSection = () => {
  return (
    <div className="">
      <Image src='/boys-having-fun.png' width={30} height={30} layout="responsive"
        objectFit="cover"
        alt='boys img' />
      <div>

      </div>

    </div>
  )
}
export default function Home() {
  return (
    <div className="">
      <HeroSection />
    </div>
  );

}
