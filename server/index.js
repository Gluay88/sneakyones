const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//database starts here..
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "sneakylittlekitty",
  // database name "sneakylittlekitty"
  // or empty => password: ""
});

// api endpoint => route create => request and respond
app.post("/create", (req, res) => {
  // variables from frontend to backend
  const name = req.body.name;
  const gender = req.body.gender;
  const age = req.body.age;
  const breed = req.body.breed;
  const weight = req.body.weight;

  // name of the table => cats
  db.query(
    "INSERT INTO cats (name, gender, age, breed, weight) VALUES (?,?,?,?,?)",
    [name, gender, age, breed, weight],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Received");
      }
    }
  );
});

app.get("/kitties", (req, res) => {
  // table name => cats
  db.query("SELECT * FROM cats", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("ServerKitty is running on port 3001!! 😽");
});
