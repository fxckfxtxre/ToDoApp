const express = require("express");
const fs = require("fs");
const path = require("path");
const engines = require('consolidate');

const app = express();
const jsonParser = express.json();
const listPath = "list.json";

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

function getNewId() {
    min = Math.ceil(10000000000);
    max = Math.floor(90000000001);
    return Math.floor(Math.random() * (max - min)) + min;
}

app.get("/app", function(req, res) {
    res.render("index");
})

app.get("/", function(req, res) {
    res.redirect("/app")
})

app.get("/api/list", function(req, res) {
    let list = JSON.parse(fs.readFileSync(listPath, "utf8"));

    res.send(list);
});

app.post("/api/list", jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    let doTitle = req.body.title;
    let newObj = { title: doTitle, id: getNewId() };
    let allObj = JSON.parse(fs.readFileSync(listPath, "utf8"));

    allObj.push(newObj);

    fs.writeFileSync(listPath, JSON.stringify(allObj));
    res.send(newObj);
});

app.delete("/api/list/:id", function(req, res) {
    let id = req.params.id;
    let allObj = JSON.parse(fs.readFileSync(listPath, "utf8"));

    let index = -1;
    for (let i = 0; i < allObj.length; i++) {
        if (allObj[i].id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        const doObj = allObj.splice(index, 1)[0];
        fs.writeFileSync(listPath, JSON.stringify(allObj));
        res.send(doObj);
    } else {
        res.status(404).send();
    }
});

app.listen(3002, function() {
    console.log("Listening > http://localhost:3002");
});