const express = require("express");
const logger = require("morgan");
const PORT = 5000;
require('dotenv').config()
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/phones-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const Phone = require("./models/Phone.model")
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
 
// MIDDLEWARE
app.use(express.json());
app.use(logger("dev"));
app.use(express.static("public"));
app.use(
    cors({
        origin: ["http://localhost:5173"],
    })
)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/phones", async (req, res) => {
    try {
        const allPhones = await Phone.find();
        res.status(201).json(allPhones);
    } catch (error) {
        res.status(500).json({error});
    }
})

app.get("/phones/:phoneId", async (req,res) => {
    const {phoneId} = req.params;
    if (mongoose.isValidObjectId(phoneId)) {
        try {
            const onePhone = await Phone.findById(phoneId);
            if (onePhone) {
                console.log(req.body)
                res.status(201).json({onePhone})
            } else {
                res.status(404).json({message: "phone not found"})
            }
        } catch (error) {
            res.status(500).json({error})
        }
    } else {
        res.status(500).json({message: "id seems wrong"})
    }
})


app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));