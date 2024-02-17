const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const { FarmerBot } = require('./routes/farmBotRoute.js');
const { CropPlan } = require('./routes/cropPlanRoute.js');

const app = express()
const port = process.env.PORT || 3000

const cors = require("cors");

cors({
    origin: "*"
});



app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Success");
});

app.get('/farmer/:prompt', FarmerBot)

app.get("/predict", CropPlan);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})