import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMemoFetcher from "../hooks/useMemoFetcher.jsx";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const { res, memo, setMemo, cleanup } = useMemoFetcher("/api/blog");

    if (memo) setPosts(memo);
    else res.then((r) => r.json()).then((e) => (setPosts(e), setMemo(e)));

    return cleanup;
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
          <p className="text-base font-light break-words">{post.description}</p>
        </Link>
      ))}
    </div>
  );
}
