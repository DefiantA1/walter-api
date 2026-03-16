// Make HTTP request to endpoint /test

const axios = require('axios');
const IPAddress = '134.199.166.10';
const port = 3000;


// use async/await
async function makeRequest() {
    try {
        const response = await axios.get(`http://${IPAddress}:${port}/test`);    
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

makeRequest();
