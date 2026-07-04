import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

// api routes
app.use("/api", routes);

export default app;