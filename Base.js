const { existsSync } = require('fs');
class Base { };
Base.defaultRoute = "./routes/amount.js";
Base.db;
Base.utils = { };
Base.initUtils = () => {
    return new Promise((resolve, reject) => {
        for(const f of require("fs").readdirSync("./utils/")){
            if(f !== 'utils'){
                if(!existsSync(`./utils/${f}`)) reject(`File ${f} does not exist.`);
                Base.utils[f.split('.')[0]] = require('./utils/' + f);
            }
        }
        resolve(Base.utils);
    });
};
Base.db = require("sqlite");
Base.db.open('./database.sqlite');



module.exports = Base;
