const express = require("express");
const router = express.Router();
const TastingHistory = require("../models/TastingHistory");

// GET /notes - view all tasting notes
router.get("/", async (req, res) => {
  try {
    const notes = await TastingHistory.find().sort({ createdAt: -1 });
    res.render("notes", { notes });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", { message: "Failed to retrieve notes." });
  }
});

// GET /notes/new - show form to add a new note
router.get("/new", (req, res) => {
  res.render("newNote");
});

// POST /notes - save a new tasting note
router.post("/", async (req, res) => {
  try {
    const { coffeeName, rating, dateTried, flavorNotes } = req.body;

    const newNote = new TastingHistory({
      coffeeName,
      rating,
      dateTried,
      flavorNotes,
    });

    await newNote.save();
    res.redirect("/notes");
  } catch (err) {
    console.error(err);
    res.status(500).render("error", { message: "Failed to save tasting note." });
  }
});

// POST /notes/:id/delete - delete a tasting note
router.post("/:id/delete", async (req, res) => {
  try {
    const note = await TastingHistory.findByIdAndDelete(req.params.id);
    res.redirect("/notes");
  } catch (err) {
    console.error(err);
    res.status(500).render("error", { message: "Failed to delete note." });
  }
});

module.exports = router;