import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;
const resend = new Resend(apiKey);

const app = express();
const port = 3000;

// parse JSON bodies
app.use(express.json());

app.post("/post-test", (req, res) => {
    console.log('Entered post-test');

    if (!req.body.message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    if (!req.body.email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    if (!req.body.subject) {
        return res.status(400).json({ error: 'Subject is required' });
    }

    // use resend to send an email with the message and timestamp
    sendEmail(req.body.message, req.body.email, req.body.subject, res);
});

app.post("/gps", (req, res) => {
    console.log('Entered gps');

    if (!req.body.lat) {
        return res.status(400).json({ error: 'lat is required' });
    }

    if (!req.body.lng) {
        return res.status(400).json({ error: 'lng is required' });
    }

    if (!req.body.id) {
        return res.status(400).json({ error: 'id is required' });
    }

    if (!req.body.found) {
        return res.status(400).json({ error: 'found is required' });
    }

    const message = `lat:${req.body.lat}, lng:${req.body.lng}, id:${req.body.id}, found:${req.body.found}`;
    
    // use resend to send an email with the message and timestamp
    sendEmail(message, "arthurcocker02@gmail.com", "GPS Endpoint", res);
});


async function sendEmail(message, email, subject, res) {
  try{
    const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: subject,
        html: `<p>${message}</p>`,
      });

    console.log(response);    
    res.json({ status: 'Email sent successfully', response: response });
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}

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