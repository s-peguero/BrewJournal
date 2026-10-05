const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || process.argv[2] || 3000;

if (process.argv.length !== 3) {
  console.log("Usage: node coffeeServer.js PORT_NUMBER");
  process.exit(1);
}

const uri = process.env.MONGO_CONNECTION_STRING;

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

async function connectDB() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

// Home route
app.get("/", (request, response) => {
  response.render("index");
});

// Coffee routes (API)
const coffeeRoutes = require("./routes/coffee");
app.use("/coffee", coffeeRoutes);

// Notes routes (form + DB)
const notesRoutes = require("./routes/notes");
app.use("/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT);
  console.log(`Web server started and running at http://localhost:${PORT}`);
  process.stdout.write("Type stop to shutdown the server: ");
});

process.stdin.on("data", (data) => {
  const command = data.toString().trim();

  if (command === "stop") {
    console.log("Shutting down the server");
    process.exit(0);
  } else {
    console.log(`Invalid command: ${command}`);
  }

  process.stdout.write("Type stop to shutdown the server: ");
});