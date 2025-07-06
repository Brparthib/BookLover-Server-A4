import express, { Application, Request, Response } from "express";
import { bookRoute } from "./app/controllers/books.controller";
import { borrowRoute } from "./app/controllers/borrow.controller";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://booklover-client-a4.vercel.app"],
  })
);

app.use("/api", bookRoute);
app.use("/api", borrowRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Library Management");
});

export default app;
