require("dotenv").config();

const express = require('express');
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

app.get('/', (req, res) => {res.send('Welcome to series database management homepage.'); res.end()});

//Mongo DB connection
mongoose.connect(process.env.MONGOURL).then(() => console.log("MONGO DB connected."));

const seriesRoute = require("./routes/series");
const platformRoute = require("./routes/platform");

app.use("/series", seriesRoute);
app.use("/platform", platformRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));