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

app.get(`/votes`, async (req: Request, res: Response) => {
  try {
    const data = await csv().fromFile(`./votes.csv`);
    return res.json(data);
  } catch (_) {
    return res.json({});
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port`, port);
});
