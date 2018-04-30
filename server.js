const express = require('express'), app = express(), { readdirSync } = require('fs'), { get } = require('https');
let routes = readdirSync('./routes/');
const Base = require('./Base');
Base.initUtils().then(u => console.log(`Successfully loaded ${Object.keys(u).length} utilities.`)).catch(console.log);

for(let d of routes){
  if(d === 'routes') return;
  app.get('/' + d.split(".")[0], require(`./routes/${d}`));
}

app.get('/', (req,res)=>res.send('<script>document.location.href="amount/";</script>')); // redirect to /amount/ yet



setTimeout(()=>Base.utils.updateData(Base.db), 5000); // wait 5 seconds after startup
setInterval(()=>Base.utils.updateData(Base.db), 120000); // update data every 2 minutes




app.listen(3000, ()=>console.log('Application started!'));
