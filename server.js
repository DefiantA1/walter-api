// save as server.js
const express = require("express");
const app = express();
const port = 3000;

// parse JSON bodies
app.use(express.json());

app.post("/test", (req, res) => {
  console.log("Received POST:");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  // Echo back
  res.json({ status: "ok", received: req.body });
});

// get request
app.get("/test", (req, res) => {
  console.log("Received GET:");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  // Echo back
  res.json({ status: "ok", received: req.body });
});

// put request
app.put("/test", (req, res) => {
  console.log("Received PUT:");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  // Echo back
  res.json({ status: "ok", received: req.body });
});


app.listen(port, () => {
  console.log(`Debug server listening at http://localhost:${port}`);
});