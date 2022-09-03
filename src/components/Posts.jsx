import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return posts.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.href}
          to={`/blog/${post.href}`}
          className="border-black dark:border-white border mb-8 p-4 link-blog"
        >
          <h2 className="text-lg mb-2">{post.title}</h2>
          <p className="text-base font-light">{post.description}</p>
        </Link>
      ))}
    </div>
  );
}