const express = require("express");

const app = express();

const pool = require("./db");

const cors = require("cors");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const bcrypt = require("bcrypt");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.listen(3200, () => {
  console.log("server is listening to local host 3200");
});

const authenticateToken = (req, res, next) => {
  // get the auth header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// for login
app.post("/login", async (req, res) => {
  // first authenticate user
  try {
    const { username, password } = req.body;

    //if there are missing credentials send a 400
    if (!username || !password) {
      res.sendStatus(400);
    }

    const result = await pool.query(
      "SELECT * FROM jwt_auth WHERE username = $1",
      [username]
    );

    if (result.rowCount === 0) {
      res.json({ error: "Incorrect username or password" });
    } else {
      // compare salted password
      const saltedPassword = result.rows[0].password;
      const successResult = await bcrypt.compare(password, saltedPassword);
      //   logged in successfully
      if (successResult) {
        // sign jwt
        const user = {
          name: username,
        };

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: token });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// for register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "SELECT username FROM jwt_auth WHERE username = $1",
    [username]
  );

  //if there wasn't any username found or there just isn't any entries
  if (result.rowCount === 0) {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO jwt_auth (username, password) VALUES ($1, $2)",
      [username, hash]
    );
    res.json({ successful: "user has been created" });
  } else {
    res.json({ error: "user already exists" });
  }
});

// logout
app.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    const result = pool.query(
      "UPDATE jwt_auth SET token = null WHERE token = $1",
      [refreshToken]
    );
    res.json("successfully logged out!");
  }
});

module.exports = authenticateToken;
