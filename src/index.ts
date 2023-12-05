import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
routes(app);

const port = process.env.PORT 
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
