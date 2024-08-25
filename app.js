const express = require("express");
const validation = require("./validators/datavalidator");
const model = require("./models/schoolModel");
const geolib = require("geolib");
const cors = require('cors');
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
  // validating the data
  const { error, value } = await validation(req.body);
  if (error)
    return res.status(400).json({ message: "Please provide valid details" });

  // creating a school table
  model.create(value, (err, result) => {
    if (err) throw err;
    res.status(401).json({ message: "school added successfully" });
  });
});



// GET REQUEST - to fetches all the schools based on the proximity to the user's location
app.get("/listSchools", async (req, res) => {
  const { lat, long } = req.query;

  if (!lat || !long) {
    return res.status(400).json({ message: "Please provide user location" });
  }

  // fetches all the schools from the database
  await model.find((err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      res.status(500).send("Error executing query");
      return;
    }

    // calculating the distance between two points using geolib
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
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
