const mongoose = require("mongoose");

const url = "mongodb+srv://real_chat:real_123@chat.8c9ujvc.mongodb.net/chat";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("Error", e));
