import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === "http://localhost:5173" || /\.devtunnels\.ms$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// api routes
app.use("/api", routes);

export default app;