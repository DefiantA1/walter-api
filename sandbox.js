import axios from 'axios';

const IPAddress = '134.199.166.10';
const port = 3000;


// use async/await
async function makePostRequest() {
    try {
        const response = await axios.post(
            `http://${IPAddress}:${port}/post-test`, 
            {
                message: 'From Melbourne',
                email: 'arthurcocker02@gmail.com',
                subject: 'Test Email',
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


async function makeGPSRequest() {
    try {
        const latNMEA = 2108.042223;
        const lngNMEA = 17512.211509;

        const response = await axios.post(
            `http://${IPAddress}:${port}/gps`, 
            {
                lat: latNMEA,
                lng: lngNMEA,
                id: '001',
                found: true
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

makeGPSRequest();