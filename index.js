import express from "express";
const app = express();
const port = 3000;
import bodyParser from "body-parser";
import axios from "axios";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {aa: null, ct: null, wt: null, tp: null, actualdt: null,
        fl: null, cd: null, ws: null, wd: null, vs: null});
});

app.post("/fweather", async (req, res) => {
    const {lat, lon} = req.body;
    try {
        const APIkey = "d32e84db196008cd14f6ffcce26cc330";
        const weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
        const response = await axios.get(weatherurl);
        const aa = response.data.name;
        const ct = response.data.sys.country;
        const wt = response.data.weather[0].description;
        const tp = response.data.main.temp;
        const dt = response.data.dt;
        const actualdt = new Date(dt * 1000);
        const fl = response.data.main.feels_like;
        const cd = response.data.clouds.all;
        const ws = response.data.wind.speed;
        const wd = response.data.wind.deg;
        const vs = response.data.visibility;
        res.render("index.ejs", {aa, ct, wt, tp, actualdt, fl, cd, ws, wd , vs}); 
        console.log(response);
    } catch (error) {
        console.error("Failed to make a request:", error.message);
        res.status(500).send("Failed to fetch, please check the console or your latitude and longitude for invaled figures");
    }
});
app.post("/del", (req, res) => {
    res.render("index.ejs", {aa: null, ct: null, wt: null, tp: null, actualdt: null,
        fl: null, cd: null, ws: null, wd: null, vs: null});
});
app.listen(port, () => {
    console.log(`We're live on port ${port}`);
});
