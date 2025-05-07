const mongoose = require("mongoose");

const url = "MONGODB CONNECTION HERE";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("Error", e));
