// Import necessary actions and components
import getCurrentUser from "@/app/actions/getCurrentUser";
import getBlogsById from "@/app/actions/getBlogsById";
import BlogId from "@/components/blog/BlogId";

// Define the interface for params
interface IParams {
    blogId: string;
}

// Asynchronous function for the dynamic route page
export default async function Page({ params }: { params: Promise<IParams> }) {
    // Await the params to access blogId
    const resolvedParams = await params;
    const blogId = resolvedParams.blogId;

    // Fetch the blog data
    const blog = await getBlogsById({ blogId });
    const currentUser = await getCurrentUser();

    // Log current user for debugging
    console.log('Current User:', currentUser);

    // Render the component
    return (
        <div>
            <div>
                <BlogId
                    name={blog?.name}
                    description={blog?.description}
                    blogId={blog?.id}
                    imageSrc={blog?.imageSrc}
                    authorName={currentUser?.name}
                />
            </div>
        </div>
    );
}
