import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 flex justify-center items-center h-screen">
        <Link href="/books" className="py-2 px-6 bg-teal-500 rounded-md text-white text-sm">books</Link>
      </div>
    </div>
  )
}
