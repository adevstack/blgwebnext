// Home.tsx

import Hero from "@/components/main/Hero";
import getCurrentUser from "./actions/getCurrentUser";
import getBlogs from "./actions/getBlogs";
import getUsers from "./actions/getUsers"; // Import getUsers function
import SingleBlog from "@/components/blog/SingleBlog";
import StarsCanvas from "@/components/main/StarBackground";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const blogs = await getBlogs();
  const users = await getUsers(); // Fetch users

  // Create a map for quick access to user names
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name || 'Unknown'; // Use 'Unknown' if the user name is null
    return acc;
  }, {} as Record<string, string>); // Define the type for TypeScript

  // Append author names to blogs
  const blogsWithAuthors = blogs.map(blog => ({
    ...blog,
    authorName: userMap[blog.userId] || 'Unknown', // Use 'Unknown' if the user ID does not exist
  }));

  return (
    <div className="relative min-h-screen">
      {/* Background Hero component */}
      <div className="absolute inset-x-0 top-0 z-0 h-64 bg-transparent">
        <Hero />
        <StarsCanvas/>
        </div>
      {/* Blog content above Hero */}
      <main className="relative z-10 flex flex-wrap items-start justify-start p-24 min-h-screen bg-transparent text-foreground">
        {blogsWithAuthors.map((item) => (
          <div key={item.id} className="m-4 flex-shrink-0 w-[calc(25%-2rem)]">
            <SingleBlog
              data={item}
              currentUser={currentUser}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
