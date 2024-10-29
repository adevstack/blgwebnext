import { Blog, User } from "@prisma/client";

export type SafeUser = Omit<User, 
"createdAt" | "updateAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeBlogs = Omit<Blog, "createdAt"> & {
  createdAt: string;
  authorName?: string; // Add authorName as an optional property
};
