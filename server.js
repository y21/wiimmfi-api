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


// Identify HTTP methods and endpoints
for (const httpm of fs.readdirSync("./routes/")) {
    for (const cat of fs.readdirSync(`./routes/${httpm}/`)) {
        if (!cat.endsWith(".js")) {
            for (const endpoint of fs.readdirSync(`./routes/${httpm}/${cat}`)) {
                app[httpm](`/${cat}/${endpoint.split(".")[0]}`, require(`./routes/${httpm}/${cat}/${endpoint}`));
            }
        } else {
            app[httpm](`/${cat.split(".")[0]}`, require(`./routes/${httpm}/${cat}`));
        }
    }
}

// Docs
app.use(express.static("./docs/"));

// Deprecation note; will be removed soon
app.get("/:route", (req, res) => {
    if(!fs.readdirSync("./routes/get/mkw").includes(req.params.route + ".js")) return res.send({
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
