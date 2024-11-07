import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";
import "./utils/passport.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/posts", routes.posts);
app.use("/users", routes.users);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
