import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.route";
import { AdminRoutes } from "./app/modules/Admin/admin.routes";
import router from "./app/routes";

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

export default app;
