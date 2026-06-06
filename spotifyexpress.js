const express = require("express");

const cors = require("cors");

const fs = require("fs");

const app = express();



// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());



// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {

    res.send("Backend Working");

});



// =========================
// GET FAVORITES
// =========================

app.get("/favorites", (req, res) => {

    fs.readFile(
        "favorites.json",
        "utf-8",
        (err, data) => {

            if(err){

                return res.json([]);
            }

            res.json(JSON.parse(data));
        }
    );
});



// =========================
// ADD FAVORITES
// =========================

app.post("/favorites", (req, res) => {

    const newSong = req.body;

    fs.readFile(
        "favorites.json",
        "utf-8",
        (err, data) => {

            let songs = [];

            if(!err && data){

                songs = JSON.parse(data);
            }

            songs.push(newSong);

            fs.writeFile(
                "favorites.json",
                JSON.stringify(songs),
                () => {

                    res.json({
                        message:"Song Added"
                    });
                }
            );
        }
    );
});



// =========================
// SERVER
// =========================

app.listen(5000, () => {

    console.log("Server running on port 5000");

});