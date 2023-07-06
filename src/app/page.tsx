import LgHeading from "@/components/ui/LargeHeading"
import Paragraph from "@/components/ui/Paragraph"
import type { Metadata } from "next"
import Link from "next/link"
import Image from 'next/image'


export const metadata: Metadata = {
  title: "Similarity API Home",
  description: "Free & open-source Text Similarity API"
}
export default function Home() {

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="container pt-32 max-w-7xl mx-auto w-full h-full">
        <div className="h-full flex flex-col justify-start lg:justify-center items-center lg:items-start">
          <LgHeading size={"lg"} className="three-d text-dark-gold dark:text-light-gold transition-colors delay-75">Find Similarity <br /> between Texts</LgHeading>
          <Paragraph className="max-w-xl lg:text-left">
            With Similarity API, you can easily determine similarity between two pieces of text{' '}
            <Link href="/login" className="underline underline-offset-2 text-dark-gold dark:text-light-gold">API Key</Link>
            .
          </Paragraph>

          <div className="relative w-full h-full max-w-lg lg:max-w-3xl lg:left-1/2 lg:absolute">
            <Image
            priority
            className="img-shadow"
            quality={100}
            style={{ objectFit: 'contain'}}
            fill={true}
            src={'/typewriter.png'}
            alt="typewriter"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
