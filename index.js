import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const URL = "https://api.nasa.gov/planetary/apod"
const apiKey = "ryIfDBX9yydJB2rZTTXcALzDNebsTGHIh64kG6Q6"; 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(`${URL}?`, {
            params: {
                api_key: apiKey,
              }
        });
        console.log(result.data.url);
        var nasaImg = result.data.url;
        res.render("index.ejs", {
            adop: nasaImg,
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });