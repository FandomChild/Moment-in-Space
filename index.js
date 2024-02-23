import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const URL = "https://api.nasa.gov/planetary/apod"
const apiKey = "ryIfDBX9yydJB2rZTTXcALzDNebsTGHIh64kG6Q6";
var copyright;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// get preferred picture from API that doesn't have copyright

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(`${URL}?`, {
            params: {
                api_key: apiKey,
                date: '2014-11-17',
              }
        });
        var key = result.data

        res.render("index.ejs", {
            my: key,

        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.post("/adop", async (req, res) => {

    console.log(req.body["date"]);
    var calDate = req.body["date"];
    try {
        const result = await axios.get(`${URL}?`, {
            params: {
                api_key: apiKey,
                date: calDate,
              }
        });

        var key = result.data

        if (!key.copyright) {
            console.log("NASA");
            copyright = "NASA"
        } else {
            copyright = "copyright"
        }

        res.render("adop.ejs", {
            log: key,
            mssg: copyright,

        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

