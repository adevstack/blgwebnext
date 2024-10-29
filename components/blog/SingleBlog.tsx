// SingleBlog.tsx

'use client';

import { SafeBlogs, SafeUser } from "@/types/type";
import Image from "next/image";
import { BsFillPencilFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface BlogProps {
  data: SafeBlogs; // Ensure SafeBlogs includes authorName
  currentUser?: SafeUser | null;
}

export default function SingleBlog({ data, currentUser }: BlogProps) {
  const router = useRouter();
  
  return (
    <div className="max-w-[300px] border border-gray-300 rounded-lg shadow-lg p-4 bg-transparent hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-start">
        {/* Author's name positioned above the title */}
        <div className="flex items-center mb-2">
          <svg className="w-4 h-4 text-foreground mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c-4.418 0-8 2.686-8 6 0 2.209 1.791 4 4 4h8c2.209 0 4-1.791 4-4 0-3.314-3.582-6-8-6zm0-4a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          <span className="text-foreground text-sm">By:</span>
          <span className="text-foreground text-sm font-semibold ml-1">{data.authorName}</span>
        </div>

        <h1
          className="text-xl font-semibold text-center cursor-pointer"
          onClick={() => router.push(`/blogs/${data.id}`)}
        >
          {data.name} {/* Changed to title assuming it exists */}
        </h1>

        <Image
          src={data.imageSrc}
          width={200}
          height={200}
          alt="Blog Image"
          className="rounded-md cursor-pointer"
          onClick={() => router.push(`/blogs/${data.id}`)}
        />

        <p className="text-foreground text-base text-center mt-2">
          {data.description.length > 100 ? `${data.description.substring(0, 100)}...` : data.description}
        </p>

        <button
          className="text-blue-500 underline mt-2"
          onClick={() => router.push(`/blogs/${data.id}`)}
        >
          Read More
        </button>
      </div>
      {data.userId === currentUser?.id && (
        <div className="flex items-center gap-4 mt-4">
          <BsFillPencilFill
            onClick={() => router.push(`/blogs/${data.id}`)}
            className="cursor-pointer text-[1.2rem]"
          />
        </div>
      )}
    </div>
  );
}
