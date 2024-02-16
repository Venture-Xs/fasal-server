const app = require("express")();
require("dotenv").config();

const axios = require("axios");

const port = process.env.PORT || 3000;

const { Crop } = require("./models/crop");

app.get("/", async (req, res) => {
  res.send("Success");
});

app.get("/predict", async (req, res) => {
  const data = req.body;

  const response = await axios.post("http://192.168.220.81:5001/predict", {
    N: "87",
    P: "54",
    K: "20",
    temperature: "25",
    humidity: "63",
    ph: "6",
    rainfall: "100",
  });

  Crop.insertOne({ current_crop: response.data.crop });

  // call OPENAI API
  // insert plan into database

  res.send("Sucess");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
