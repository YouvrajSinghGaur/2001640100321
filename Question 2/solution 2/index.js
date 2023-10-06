const re = require('dotenv');
re.config();
const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
    res.send(`Server working.`);
})

app.get('/numbers', async (req, res) => 
{
    let urls = req.query?.url;

    if (!Array.isArray(urls)) urls = [urls];
    const lst = []
    
    // To call all API's in parallel for faster operation.
    await Promise.all(urls.map(async url => {
        try {
            const r = await axios.get(url);
            lst.push(...r.data?.numbers)
        }
        catch (err) {
            console.log("Error");
        }
    }));
    console.log(lst);
    res.status(200).json({
        message: "success",
        result: lst
    });

})


app.listen(process.env.PORT, function () {
    console.log(`Listening on ${process.env.PORT}`);
})