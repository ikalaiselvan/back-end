import express from "express";
import { MongoClient } from "mongodb";

import * as dotenv from 'dotenv';
dotenv.config()

const app = express();

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected ✌️😊");

app.get("/", function (request, response) {
  response.send("welcome to gold price calculator");
});

app.get("/goldPrice", async function (request, response) {
  response.set('Access-Control-Allow-Origin', '*');
  const result = await client.db("b39wd").collection("goldPrice").find(request.query).toArray();
  response.send(result);
});

app.post("/goldPrice",express.json(), async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await await client.db("b39wd").collection("goldPrice").insertMany(data);
  response.send(result);
});




app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
