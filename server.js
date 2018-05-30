const express = require("express"), app = express(), { readdirSync } = require("fs"), { get } = require("https"), fs = require("fs");
const Base = require("./Base");
Base.initUtils().then(u => console.log(`Successfully loaded ${Object.keys(u).length} utilities.`)).catch(console.log);

// Routes (endpoints)
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
