const express = require('express');
const app = express();
const { readdirSync } = require('fs');

for(let d of readdirSync('./routes/')){
  if(d !== 'routes') app.get('/' + d.split(".")[0], require(`./routes/${d}`));
}
app.get('/', (req,res)=>res.send('<script>document.location.href="amount/";</script>')); // redirect to /amount/ yet


app.listen(3000, ()=>console.log('Application started!'));
