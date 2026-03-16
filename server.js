// save as server.js
const express = require("express");
const app = express();
const port = 3000;

// parse JSON bodies
app.use(express.json());

app.post("/post-test", (req, res) => {
  // Echo back
  res.json({ 
    message: 'POST Request Received! It worked!',
    status: 200,
    timestamp: new Date().toISOString()
  });
});

// get request
app.get("/test", (req, res) => {
    const data = {
        message: 'Hello, World!',
        status: 200,
        timestamp: new Date().toISOString()
    };
    
    // Use res.json() to send a structured JSON response
    res.json(data); 
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