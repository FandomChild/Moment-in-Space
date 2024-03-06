import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// set consts and needed variables
const app = express();
const port = 3000;
const URL = "https://api.nasa.gov/planetary/apod"
const apiKey = "ryIfDBX9yydJB2rZTTXcALzDNebsTGHIh64kG6Q6";
var copyright;

// set the current date to pass as max input on date form in ejs, make sure it's actually local time and not UTC
var current = new Date();
var year = current.getFullYear();
var month = ('0' + (current.getMonth() + 1)).slice(-2);
var day = ('0' + current.getDate()).slice(-2);
var present = year+'-'+month+'-'+day;
console.log(present)

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// get preferred picture from API that doesn't have copyright, for home page

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
            max: present,
            my: key,

        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.post("/post", async (req, res) => {

    console.log(req.body["date"]);
    var calDate = req.body["date"];

    // make an error catch in case date is left blank

    if (calDate === "") {
        res.render("error.ejs", {
            max: present,
        });
    } else {

        // use date to get image using axios as usual
        try {
            const result = await axios.get(`${URL}?`, {
                params: {
                    api_key: apiKey,
                    date: calDate,
                }
            });

            var key = result.data;
            console.log(key);

            // check for copyright then render the correct page

            if (!key.copyright) {
                copyright = "none";
            } else {
                copyright = "copyright";
            }

            if (copyright === "none") {
                res.render("adop.ejs", {
                    log: key,
                    max: present,
                });
            } else {
                res.render("copyright.ejs", {
                    copyDate: calDate,
                    max: present,
                    mssg: copyright,
                });
            }
        } catch (error) {
            console.log(error.response.data);
            res.status(500);
        }
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

