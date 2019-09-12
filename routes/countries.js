const express = require("express");
const router = express.Router();

const Country = require("../models/country");

/**
 * GET All
 */
router.get("/", async (req, res) => {
  try {
    const list = await Country.find();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET ONE
 */
router.get("/:name", get_country, (req, res) => {
  res.status(200).json(res.country);
});

/**
 * POST
 */
router.post("/", async (req, res) => {
  const new_country = new Country({
    country: req.body.country,
    population: req.body.population,
    continent: req.body.continent,
    lifeExpectancy: req.body.lifeExpectancy,
    purchasingPower: req.body.purchasingPower
  });
  try {
    const saved = await new_country.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * UPDATE
 */
router.patch("/:name", get_country, async (req, res) => {
  let updating = res.country;
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
  try {
    await Country.updateOne({ country: req.params.name }, updating, err => {
      if (err) return res.status(400).json({ message: err.message });
    });
    const uodated = await Country.find({country: req.params.name});
    res.status(200).json(uodated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE
 */
router.delete("/:name", async (req, res) => {
  try {
    await Country.deleteOne({ country: req.params.name }, err => {
      if (err) return res.status(500).json({ message: err.message });
    });
    res.status(200).json({ message: `Country Deleted: ${req.params.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Middleware
 */
async function get_country(req, res, next) {
  let cc;
  try {
    cc = await Country.find({ country: req.params.name });
    if (!cc) {
      return res
        .status(404)
        .json({ message: `Cannot find Country ${req.params.name}` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.country = cc;
  next();
}

/**
 * ? Export
 */
module.exports = router;
