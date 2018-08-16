const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    { readdirSync } = require("fs"),
    { get } = require("https"),
    fs = require("fs");
const Base = require("./Base");
Base.initUtils().then(u => console.log(`Successfully loaded ${Object.keys(u).length} utilities.`)).catch(console.log);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("json spaces", 4);

// GET Routes (endpoints)
for (const d of fs.readdirSync("./routes/")) {
    try {
        for(const e of fs.readdirSync("./routes/" + d)) {
            app.get(`/${d}/${e.split(".")[0]}`, require(`./routes/${d}/${e}`));
        }
    } catch(e) {
        console.log(e.toString());
    }
}

// POST Routes (endpoints)
for (const d of fs.readdirSync("./post-routes/")) {
    try {
        for(const e of fs.readdirSync("./post-routes/" + d)) {
            app.post(`/${d}/${e.split(".")[0]}`, require(`./post-routes/${d}/${e}`));
        }
    } catch (e) {
        console.log(e.toString());
    }
}

// Docs
app.use(express.static("./docs/"));

// Deprecation note; will be removed soon
app.get("/:route", (req, res) => {
    if(!fs.readdirSync("./routes/mkw").includes(req.params.route + ".js")) return res.send({
        status: 400,
        error: "Endpoint does not exist."
    });
    res.json({
        status: 400,
        error: `This endpoint is deprecated. Please use /mkw/${req.params.route} instead.`
    });
});

setTimeout(() => Base.utils.updateData(Base.db), 5000); // wait 5 seconds after startup
setInterval(() => Base.utils.updateData(Base.db), 30000); // update data every 30 seconds

app.listen(3000, () => console.log("Application started!"));
