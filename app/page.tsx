import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <div className="w-full py-4">
      <div className="container mx-auto px-4 flex flex-col justify-center items-center min-h-screen">
        <Image src={"/book.png"} alt="book" width={150} height={150} />
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-10">
          <h1 className="text-2xl md:text-5xl font-semibold">Welcome to my simple project CRUD with NEXT.JS</h1>
        </div>
        <Link href="/books" className="py-2 px-6 bg-teal-500 hover:bg-teal-600 rounded-md text-white text-lg flex items-center gap-x-2 font-semibold shadow-md">Let's Start <FiArrowRight className="mt-1" /></Link>
      </div>
    </div>
  )
}
