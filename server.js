require("dotenv").config(); //load variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || "5000";

const app = express();
app.use(express.json());

/**
 * * MongoDB Connection
 * Septup - Brew
 * https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
 */
mongoose
  .connect(process.env.MLAN, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .catch(err => console.log("Error en Conexion :(", err));
const db = mongoose.connection;
db.on("error", err => console.log("DB Error :: ", err));
db.once("open", _ => console.log("DB Connection Established."));

/**
 * * Routes
 */
const countries_router = require("./routes/countries");
app.use("/countries", countries_router);

app.get("/", (req, res) => res.json({ message: "use /countries" }));

/**
 * ? Server
 */
app.listen(PORT, _ => console.log(`Listening on PORT ${PORT}`));
