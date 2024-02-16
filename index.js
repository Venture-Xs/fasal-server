const app = require("express")();
require("dotenv").config();

const axios = require("axios");

const port = process.env.PORT || 3000;

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

  res.send(response.data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
