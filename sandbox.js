import axios from 'axios';
import { Resend } from 'resend';

import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.RESEND_API_KEY;


const resend = new Resend(apiKey);

const IPAddress = '134.199.166.10';
const port = 3000;


// use async/await
async function makePostRequest() {
    try {
        const response = await axios.post(
            `http://${IPAddress}:${port}/post-test`, 
            {
                message: 'Attempting to send a POST request!',
                timestamp: new Date().toISOString()
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });  

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// makePostRequest();


// async function makeGetRequest() {
//     try {
//         const response = await axios.get(
//             `http://${IPAddress}:${port}/test`
//         );  

//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// }

// makeGetRequest();

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