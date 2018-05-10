const express = require('express'), app = express(), { readdirSync } = require('fs'), { get } = require('https'), fs = require('fs');
const Base = require('./Base');
Base.initUtils().then(u => console.log(`Successfully loaded ${Object.keys(u).length} utilities.`)).catch(console.log);

for(let d of fs.readdirSync("./routes/")){
    try {
        if (d !== "routes") {
            app.get("/" + d.split(".")[0], require(`./routes/${d}`));
        }
    }catch(e) {
        console.log(e.toString());
    }
}

app.get('/', (req,res) => res.send('<script>document.location.href="amount/";</script>')); // redirect to /amount/ yet



setTimeout(()=>Base.utils.updateData(Base.db), 5000); // wait 5 seconds after startup
setInterval(()=>Base.utils.updateData(Base.db), 30000); // update data every 30 seconds




app.listen(3000, ()=>console.log('Application started!'));
