import express from "express";
import config from "./config.json";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(config.webport);