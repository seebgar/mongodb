require("dotenv").config(); //load variables from .env file

const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const client = new MongoClient(process.env.MLAN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/**
 * GET All
 */
router.get("/", (req, res) => {
  client.connect(async function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db("country");
    const collection = db.collection("countries");

    // FIND ADD
    try {
      const ccs = await collection.find({});
      ccs
        .toArray()
        .then(x => res.status(200).send(x))
        .finally(_ => client.close());
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
});

/**
 * GET ONE
 */
router.get("/:name", (req, res) => {
  client.connect(async function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db("country");
    const collection = db.collection("countries");

    // FIND ONE
    try {
      const ccs = await collection.find({ country: req.params.name });
      ccs
        .toArray()
        .then(x => res.status(200).send(x))
        .catch(err => res.status(404).json({ message: err.message }))
        .finally(_ => client.close());
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });
});

/**
 * POST
 */
router.post("/", (req, res) => {
  const new_country = {
    country: req.body.country,
    population: req.body.population,
    continent: req.body.continent,
    lifeExpectancy: req.body.lifeExpectancy,
    purchasingPower: req.body.purchasingPower
  };

  client.connect(async function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db("country");
    const collection = db.collection("countries");

    // INSERT ONE
    try {
      collection
        .insertOne(new_country, (err, result) => {
          if (err) {
            res.status(400).json({ message: err.message });
            return;
          }
          res.status(201).send(result.ops);
          client.close();
        })
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
});

/**
 * UPDATE
 */
router.patch("/:name", (req, res) => {
  let updating = {};
  if (req.body.population) {
    updating.population = req.body.population;
  }
  if (req.body.continent) {
    updating.continent = req.body.continent;
  }
  if (req.body.lifeExpectancy) {
    updating.lifeExpectancy = req.body.lifeExpectancy;
  }
  if (req.body.purchasingPower) {
    updating.purchasingPower = req.body.purchasingPower;
  }

  client.connect(async function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db("country");
    const collection = db.collection("countries");

    // UPDATE ONE
    try {
      collection
        .findOneAndUpdate(
          { country: req.params.name },
          { $set: updating },
          { returnOriginal: false },
          (err, result) => {
            if (err) {
              res.status(400).json({ message: err.message });
              return;
            }
            res.status(200).json(result.value);
            client.close();
          }
        )
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
});

/**
 * DELETE
 */
router.delete("/:name", (req, res) => {
  client.connect(async function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db("country");
    const collection = db.collection("countries");

    // FIND ADD
    try {
      collection
        .findOneAndDelete({ country: req.params.name }, (err, result) => {
          if (err) {
            res.status(494).json({ message: err.message });
            return;
          }
          res.status(200).send(result.value);
          client.close();
        })
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
});

/**
 * ? Export
 */
module.exports = router;
