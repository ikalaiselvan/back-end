import express from "express";
import { MongoClient } from "mongodb";

import * as dotenv from 'dotenv';
dotenv.config()
// var request = require('request');

const app = express();

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected ✌️😊");


// const mov = await getAllMovies(request);
// await client.db("b39wd").collection("movies").find(request.query).toArray();
  
  // console.log(request.query)
  //   response.send(mov);


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



// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
// var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=TK0FDCKVDETSTUYQ';
// var url = 'https://www.alphavantage.co/TK0FDCKVDETSTUYQ';

// request.get({
//     url: url,
//     json: true,
//     headers: {'User-Agent': 'request'}
//   }, (err, res, data) => {
//     if (err) {
//       console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//       console.log('Status:', res.statusCode);
//     } else {
//       // data is successfully parsed as a JSON object:
//       console.log(data);
//     }
// });
