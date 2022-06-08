import express, { Request, Response } from "express";
import csv from "csvtojson";

const app = express();

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Conrol-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": ["GET"]
  });
  if (req.method === "OPTIONS") return res.end("");
  next();
});

app.get(`/version`, (req: Request, res: Response) => {
    const version = require(`../package.json`).version
    return res.send(version)
});

app.get(`/data`, async (req: Request, res: Response) => {
  try {
    const data = await csv().fromFile(`./data.csv`);
    return res.json(data);
  } catch (_) {
    return res.json({});
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port`, port);
});
