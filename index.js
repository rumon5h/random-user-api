const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require("fs");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get a random user from json file

app.get("/user/random", (req, res) => {
  fs.readFile("users.json", (error, data) => {
    if (error) {
      res.write("Internal server error.");
      res.end();
    } else {
      //Generate a random number between 0 to 16
      const randomId = Math.floor(Math.random() * 17);

      const users = JSON.parse(data);
      const user = users.find((u) => u.id == randomId);
      res.write(JSON.stringify(user));
      res.end();
    }
  });
});

app.listen(PORT, () => {
  console.log("Listening to the port", PORT);
});
