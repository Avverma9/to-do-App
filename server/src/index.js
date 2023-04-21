const express = require("express");
const cors = require("cors");
const db = require("./configuration");
const routes = require("./routes/route");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/", routes);

// Start the server
db.authenticate()
  .then(() => {
    console.log("Connected to the database.");
    app.listen(3001, () => {
      console.log("Server started on port 3001.");
    });
  })
  .catch((err) => console.error(err));
