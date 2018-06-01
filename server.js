const express = require("express"), app = express(), bodyParser = require("body-parser"), { readdirSync } = require("fs"), { get } = require("https"), fs = require("fs");
const Base = require("./Base");
Base.initUtils().then(u => console.log(`Successfully loaded ${Object.keys(u).length} utilities.`)).catch(console.log);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET Routes (endpoints)
for(const d of fs.readdirSync("./routes/")){
    try {
        if (d !== "routes") {
            if(d !== "ssbb") {
                app.get("/" + d.split(".")[0], require(`./routes/${d}`));
            } else {
                for(const ssbbRoute of readdirSync("./routes/ssbb/")){
                    app.get("/ssbb/" + ssbbRoute.split(".")[0], require(`./routes/ssbb/${ssbbRoute}`));
                }
            }
        }
    } catch(e) {
        console.log(e.toString());
    }
}

// POST Routes (endpoints)
for(const d of fs.readdirSync("./post-routes/")){
    try {
        if (d !== "post-routes") {
            if(d !== "ssbb") {
                app.post("/" + d.split(".")[0], require(`./post-routes/${d}`));
            } else {
                for(const ssbbRoute of readdirSync("./post-routes/ssbb/")){
                    app.post("/ssbb/" + ssbbRoute.split(".")[0], require(`./post-routes/ssbb/${ssbbRoute}`));
                }
            }
        }
    } catch(e) {
        console.log(e.toString());
    }
}


// Docs
for(const d of fs.readdirSync("./docs/")){
    try {
        app.get(`/docs/${d}`, (req, res) => res.sendFile(`${__dirname}/docs/${d}`));
    } catch(e) {
        console.log(e.toString());
    }
}

app.get("/", (req,res) => res.send("<script>document.location.href='docs/index.html';</script>"));



setTimeout(() => Base.utils.updateData(Base.db), 5000); // wait 5 seconds after startup
setInterval(() => Base.utils.updateData(Base.db), 30000); // update data every 30 seconds

app.listen(3000, () => console.log("Application started!"));
