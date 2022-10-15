const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require("fs");
const users = require("./users.json");
const _ = require("underscore");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the first ACC assignment!");
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

// Get all random users

app.get("/user/all", (req, res) => {
  fs.readFile("users.json", (error, data) => {
    if (error) {
      res.write("Internal server error.");
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

// Post a random user

app.post("/user/save", (req, res) => {
  if (
    req.body.id == undefined ||
    req.body.gender == undefined ||
    req.body.name == undefined ||
    req.body.contact == undefined ||
    req.body.address == undefined ||
    req.body.photoUrl == undefined
  ) {
    res.write("A value is missing");
    res.end();
  } else {
    users.push(req.body);
    console.log(users);
    res.write("Data has been saved");
    res.end();
  }
});

// Update a random user

app.patch("/user/update", (req, res) => {
  const data = req.body;
  const query = req.query;

  const i = users.findIndex((user) => {
    return user.id == query.id;
  });

  if (i == -1) {
    res.write("User not found!");
    res.end();
  } else {
    if (data.name != undefined) {
      users[i].name = data.name;
    }
    if (data.gender != undefined) {
      users[i].gender = data.gender;
    }
    if (data.address != undefined) {
      users[i].address = data.address;
    }
    if (data.contact != undefined) {
      users[i].contact = data.contact;
    }
    if (data.photoUrl != undefined) {
      users[i].photoUrl = data.photoUrl;
    }

    res.write("Successfully Updated User");
    res.end();
  }
});

// Delete a random user

app.delete("/user/delete", (req, res) => {
  const query = req.query;
  const i = users.findIndex((user) => {
    return user.id == query.id;
  });

  if (i == -1) {
    res.write("User not found");
    res.end();
  } else {
    users.splice(i, 1);
    res.write("Successfully Deleted the user!");
    res.end();
  }
});

app.patch("/user/bulk-update", (req, res) => {
  const getUsers = req.body;
  let newUsers;
    
  // users.push(newUsers);
  res.write("Successfully added all information!");
  res.end();
});

app.all("*", (req, res) => {
  res.send("Route not found.");
});

app.listen(PORT, () => {
  console.log("Listening to the port", PORT);
});
