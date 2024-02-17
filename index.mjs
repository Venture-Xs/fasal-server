import dotenv from 'dotenv'
dotenv.config();
import express from 'express'

import { Farmerbot } from './controllers/farmbot.mjs';
import axios from "axios"
const app = express()
const port = process.env.PORT || 3000


app.use(express.json());


import Crop from "./models/crop.mjs"

app.get("/", async (req, res) => {
    res.send("Success");
});

app.get('/farmer/:prompt', Farmerbot)

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
})