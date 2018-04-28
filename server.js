const express = require('express');
const app = express();
const { readdirSync } = require('fs');

for(let d of readdirSync('./routes/')){
  app.get('/' + d.split(".")[0], require(`./routes/${d}`));
}

app.listen(3000, ()=>console.log('Application started!'));
