import { Resend } from 'resend';
import axios from 'axios';

const resend = new Resend(process.env.RESEND_API_KEY);

const IPAddress = '134.199.166.10';
const port = 3000;


// use async/await
async function makeRequest() {
    try {
        const response = await axios.post(
            `http://${IPAddress}:${port}/post-test`, 
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            },
            {
            message: 'Attempting to send a POST request!',
            timestamp: new Date().toISOString()
        });   

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// makeRequest();

async function sendEmail(message) {
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'arthurcocker02@gmail.com',
      subject: 'hello world',
      html: `<p>${message}</p>`,
    });

    console.log('Email sent successfully');
}

sendEmail('Attempting to send an email!');