const express = require("express");
const router = express.Router();

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = "starbucks-coffee-db2.p.rapidapi.com";
const BASE_URL = "https://starbucks-coffee-db2.p.rapidapi.com/api/recipes";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-host": RAPID_API_HOST,
    "x-rapidapi-key": RAPID_API_KEY,
  },
};

// GET /coffee/search?name=mocha — Drinks by Name
router.get("/search", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}?name=${encodeURIComponent(req.query.name)}`,
      options
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search drinks." });
  }
});

// GET /coffee/id/:id — Drinks by ID
router.get("/id/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}?id=${req.params.id}`,
      options
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch drink by ID." });
  }
});

// GET /coffee/category?category=HOT BEVERAGES — Drinks by Category
router.get("/category", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}?category=${encodeURIComponent(req.query.category)}`,
      options
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch drinks by category." });
  }
});

// GET /coffee/ingredient?ingredient=chocolate — Drinks by Ingredient
router.get("/ingredient", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}?ingredient=${encodeURIComponent(req.query.ingredient)}`,
      options
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch drinks by ingredient." });
  }
});

// GET /coffee/list — List of all Drinks/Recipes
router.get("/list", async (req, res) => {
  try {
    const response = await fetch(BASE_URL, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch drinks list." });
  }
});

module.exports = router;