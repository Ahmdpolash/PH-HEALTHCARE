import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("PH HEALTHCARE IS RUNNING ");
});

// middleware

app.use(globalErrorHandler);
app.use(notFound);

export default app;
