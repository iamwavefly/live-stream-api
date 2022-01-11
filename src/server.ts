import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import swaggerDocs from "./docs/";
import UserRoute from "./api/routes/user/";

const app: Application = express();
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({
    message: "Live sumo API index",
  });
});
app.use("/api/user", UserRoute);
// swagger setup
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// create port server
const port = process.env.PORT || 5000;

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error?.message}`);
}
