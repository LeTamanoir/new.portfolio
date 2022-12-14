import { Router } from "express";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.get("/api/login", (req, res) => {
  if (req.session.user) return res.json({ auth: true });

  res.json({ auth: false });
});

authRouter.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({ auth: false, message: "complete all fields" });
  if (!process.env.BLOG_USERNAME || !process.env.BLOG_PASSWORD)
    return res.sendStatus(403);

  if (
    process.env.BLOG_USERNAME === username &&
    bcrypt.compareSync(password, process.env.BLOG_PASSWORD)
  ) {
    req.session.user = { auth: true };
    return req.session.save(() => res.json({ auth: true }));
  }

  res.json({ auth: false, message: "bad username or password" });
});

export default authRouter;
