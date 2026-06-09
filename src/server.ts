import express from "express";
import cors from "cors";

import { session } from "./sessionStore";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Copado HX API Running");
});

app.get("/session", (req, res) => {
  console.log("Current Session:", session);
  res.json(session);
});

app.put("/session", (req, res) => {
  console.log("=================================");
  console.log("Received Request:", req.body);

  session.loggedIn = req.body.loggedIn;
  session.user = req.body.user;
  session.environment = req.body.environment;
  session.lastAction = req.body.lastAction;
  session.lastUpdated = req.body.lastUpdated;

  console.log("Updated Session:", session);
  console.log("=================================");

  res.json({
    success: true,
    session
  });
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});