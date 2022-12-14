import { Outlet } from "react-router-dom";
import("../style/hljs.css");
import("../style/markdown.css");

export default function Blog() {
  return (
    <main className="flex w-[90vw] sm:w-[40rem] lg:w-[50rem] justify-center mt-14 mb-20">
      <Outlet />
    </main>
  );
}
