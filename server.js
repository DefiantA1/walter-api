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
        console.log('lat is required');
        return res.status(400).json({ error: 'lat is required' });
    }

    if (!req.body.lng) {
        console.log('lng is required');
        return res.status(400).json({ error: 'lng is required' });
    }

    if (!req.body.id) {
        return res.status(400).json({ error: 'id is required' });
    }

    if (!req.body.found) {
        return res.status(400).json({ error: 'found is required' });
    }

    let message = '';

    if(req.body.found == "0" || req.body.found == 0){
        message = `lat:${req.body.lat}, lng:${req.body.lng}, id:${req.body.id}, found:${req.body.found}`;
    }
    else{
        const mapLink = convertToMapsLink(req.body.lat, req.body.lng);
        message = `Tracker ID: ${req.body.id}\nGoogle Maps Link: ${mapLink}`;
    }

    console.log(`message: ${message}`);
    
    // use resend to send an email with the message and timestamp
    // sendEmail(message, res);
    sendToServer(req.body, message, res);
});

function sendToServer(data, message, res){
    try {
        const response = await fetch(
            "https://addbeetlegps-njwryunntq-uc.a.run.app",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lat: data.lat,
                    lng: data.lng,
                    beetleId: data.id,
                    found: data.found,
                }),
            }
        );

        console.log(`response from friebase: ${response}`);

        // const data = await response.json();
        await sendEmail(message, res);
    } catch (error) {
        console.error("Error:", error);
    }
}


function convertToMapsLink(lat, lng){
    function convert(coord) {
        const degrees = Math.floor(coord / 100);
        const minutes = coord - (degrees * 100);
        return degrees + (minutes / 60);
    }

    const decimalLat = -convert(lat); // South
    const decimalLng = -convert(lng); // West

    const url = `https://www.google.com/maps?q=${decimalLat},${decimalLng}`;

    return url;
}


async function sendEmail(message, res) {
  try{
    const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: "arthurcocker02@gmail.com",
        subject: "GPS Endpoint",
        html: `<p>${message}</p>`,
      });

    console.log(`Email sent successfully`); 
    res.json({ status: 'Email sent successfully'});
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