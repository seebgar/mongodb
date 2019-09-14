require("dotenv").config(); //load variables from .env file

const express = require("express");
const PORT = process.env.PORT || "5000";

const app = express();
app.use(express.json());

/**
 * * Routes
 */
const countries_router = require("./routes/countries_mongo.js");
app.use("/countries", countries_router);

app.get("/", (req, res) => res.json({ message: "use /countries" }));

/**
 * ? Server
 */
app.listen(PORT, _ => console.log(`Listening on PORT ${PORT}`));
