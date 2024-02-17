const axios = require("axios")
const Crop = require("../models/crop")
const { strict_output } = require("../controllers/gpt")

const CropPlan = async (req, res) => {
    const data = req.body;

    const response = await axios.get("http://localhost:3001/predict", {
        N: "87",
        P: "54",
        K: "20",
        temperature: "25",
        humidity: "63",
        ph: "6",
        rainfall: "100"
    });

    // Crop.insertOne({ current_crop: response.data.crop });

    console.log("The suggested crop is :" + response);

    // call OPENAI API
    // insert plan into database

    // const imageSearchTerm = await strict_output(
    //     "an AI system that generates highly detailed, day-by-day instructions for successfully farming a specified crop. The instructions should cover each day of the farming duration, considering factors like seed preparation, soil management, watering, fertilization, pest control, and harvesting. The output should be in JSON format, providing specific guidance for each day throughout the entire cultivation period, It should contain atleast 50 days before harvest, It should follow all latest scientific farming tricks and tips to maximize profit like mixed cropping, drip irrigation, Each description should be two paragraphs. It should be in JSON String format",
    //     "Given the crop name maize, provide me with an exhaustive day-by-day guide for successfully farming this crop. I'm looking for detailed instructions covering each day from planting to harvesting. The guidance should be clear, beginner-friendly, and actionable. The output should be in JSON format for easy reference",
    //     {
    //         "crop_name": "provided_crop_name",
    //         "detailed_cultivation_guide": [
    //             {
    //                 "day": 1,
    //                 "instructions": [
    //                     "Day 1 instructions here..."
    //                 ]
    //             },
    //             {
    //                 "day": 2,
    //                 "instructions": [
    //                     "Day 2 instructions here..."
    //                 ]
    //             },
    //             {
    //                 "day": 3,
    //                 "instructions": [
    //                     "Day 3 instructions here..."
    //                 ]
    //             },
    //             // Continue extending the template as needed
    //             {
    //                 "day": "n",
    //                 "instructions": [
    //                     "Day n instructions here..."
    //                 ]
    //             }
    //         ]
    //     }


    // );
    // res.send("Success : " + imageSearchTerm);
};

module.exports = { CropPlan }