const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "admin",
    host: "database-1.cy1m3s5bdkpt.us-east-2.rds.amazonaws.com",
    password: "DargonBallS051701!",
    database: "roaringdb",
});

app.post("/register", (req, res)=> {

  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  
      db.query("INSERT INTO Users (FirstName, LastName, Email) VALUES (?,?,?)",
      [FirstName, LastName, Email],
      (err, result) => {
          console.log(err);
      }
      );
  });

  app.get("/viewUserForms", (req, res)=>{
    const sqlSelect = "SELECT * FROM Forms WHERE UserID = ?";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(3001, () => {
    console.log("running server");
});