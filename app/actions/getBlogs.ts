// actions/getBlogs.ts

import { Blog } from '@prisma/client'; // Ensure you import your Blog type from Prisma
import prisma from '../lib/prismadb';

export default async function getBlogs(): Promise<(Blog & { createdAt: string })[]> {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeBlogs = blogs.map((blog) => ({
      ...blog,
      createdAt: blog.createdAt.toISOString(),
    }));

    return safeBlogs;
  } catch (err: unknown) {
    console.error('Error fetching blogs:', err); // Log the actual error
    throw new Error('Could not fetch blogs. Please try again later.'); // User-friendly error
  }
}
