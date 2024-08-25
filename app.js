const express = require("express");
const validation = require("./validators/datavalidator");
const model = require("./models/schoolModel");
const geolib = require("geolib");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// POST REQUEST - to add schools
app.post("/addschool", async (req, res) => {
  try {
    // Validating the data
    const { error, value } = await validation(req.body);
    if (error) {
      return res.status(400).json({ message: "Please provide valid details" });
    }

    // Creating a school record in the database
    await model.create(value);
    res.status(201).json({ message: "School added successfully" });
  } catch (err) {
    console.error("Error adding school:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET REQUEST - to fetch all the schools based on proximity to the user's location
app.get("/listSchools", async (req, res) => {
  const { lat, long } = req.query;

  if (!lat || !long) {
    return res.status(400).json({ message: "Please provide user location" });
  }

  try {
    // Fetches all the schools from the database
    const results = await model.find();
    if(!results){
      return res.status(404).json({message:'No Data Found Please add schools'});
    }
    
    // Calculating the distance between two points using geolib
    const sortedSchools = results
      .map((school) => {
        const distance = geolib.getDistance(
          { latitude: lat, longitude: long },
          { latitude: school.latitude, longitude: school.longitude }
        );
        return { ...school, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (err) {
    console.error("Error retrieving schools:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
