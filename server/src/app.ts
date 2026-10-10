import express from "express";
import routes from "./routes";
import cors from "cors";
import errorHandler from "./middleware/error-handler";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin === "http://localhost:5173" ||
        origin === process.env.FRONTEND_URL ||
        /\.devtunnels\.ms$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// api prefix routes
app.use("/api", routes);

app.use(errorHandler);

export default app;
