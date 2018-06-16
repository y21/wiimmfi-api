const { get } = require("https"),
    { mkwii, ssbb, animal_crossing_ds } = require("../RegExes");
try {
    /**
     * Updates the database.
     *
     * @param db SQLite database
     * @param data An object with information such as amount of total WWs, total continentals, total privates etc.
     */
    module.exports = (db) => {
        let str = "",
            result = {};
        get("https://wiimmfi.de/mkw/list", (re) => {
            re.on("data", d => {
                str += d;
            });
            re.on("end", () => {
                result = {
                    // amount endpoint
                    status: 200,
                    totalAvailable: {
                        worldwides: str.split(mkwii.worldwides).length - 1,
                        continentals: str.split(mkwii.continentals).length - 1,
                        privates: str.split(mkwii.privates).length - 1,
                        players: str.split(mkwii.players).length - 1
                    },

                    // regions endpoint (for available rooms)
                    ctgp: str.split(mkwii.ctgp).length - 1,
                    eur: str.split(mkwii.eur).length - 1,
                    jap: str.split(mkwii.jap).length - 1,
                    ame: str.split(mkwii.ame).length - 1
                };

                // ---------------------
                // Queries
                // ---------------------


                //  TotalAmount Queries
                db.all("select * from totalAmount").then(r => {
                    if (r.length === 0) return db.run(`insert into totalAmount values ('${result.totalAvailable.worldwides}', '${result.totalAvailable.continentals}', '${result.totalAvailable.privates}', '${Date.now()}', '${result.totalAvailable.players}')`).catch(console.log);
                    else db.run(`update totalAmount set WWs='${result.totalAvailable.worldwides || 0}', continentals='${result.totalAvailable.continentals || 0}', privates='${result.totalAvailable.privates || 0}', lastEdit='${Date.now()}', players='${result.totalAvailable.players}'`).catch(console.log);
                }).catch(error => {
                    if (error.toString().includes("no such table: totalAmount")) {
                        return db.run("CREATE TABLE 'totalAmount' ( `WWs` TEXT, `continentals` TEXT, `privates` TEXT, `lastEdit` TEXT, `players` TEXT )").catch(console.log);
                    } else console.log(error.toString());
                });

                // Regions Queries
                db.all("select * from region_amount").then(r => {
                    if (r.length === 0) return db.run(`insert into region_amount values('${result.eur}', '${result.jap}', '${result.ctgp}', '${result.ame}')`).catch(console.log);
                    else db.run(`update region_amount set eur='${result.eur}', jap='${result.jap}', ctgp='${result.ctgp}', ame='${result.ame}'`).catch(console.log);
                }).catch(error => {
                    if (error.toString().includes("no such table: region_amount")) {
                        return db.run("CREATE TABLE `region_amount` ( `eur` INTEGER, `jap` INTEGER, `ctgp` INTEGER, `ame` INTEGER )").catch(console.log);
                    } else console.log(error.toString());
                });
            });
        });
        get("https://wiimmfi.de/stat?m=28", (re) => {
            let str = "",
                result = {};
            re.on("data", d => {
                str += d;
            });
            re.on("end", () => {
                result = {
                  ssbb: {
                  totalProfiles: ((str.match(ssbb.totalProfiles) || ["0"])[0].match(/\d+/) || ["0"])[0],
                    online: ((str.match(ssbb.totalProfiles) || ["0"])[0].match(/\d+/g) || [null, "0"])[1],
                    logins: {
                        thirty_minutes: ((str.match(ssbb.logins) || ["0"])[0].match(/\d+/g) || [null, null, "—"])[2],
                        four_hours: ((str.match(ssbb.logins) || ["0"])[0].match(/\d+/g) || [null, null, null, "—"])[3],
                        twentyfour_hours: ((str.match(ssbb.logins) || ["0"])[0].match(/\d+/g) || [null, null, null, null, "—"])[4]
                    }
                  },
                  animal_crossing_ds: {
                  totalProfiles: ((str.match(animal_crossing_ds.totalProfiles) || ["0"])[0].match(/\d+/) || [null, "0"])[1] || "0",
                    online: ((str.match(animal_crossing_ds.totalProfiles) || ["0"])[0].match(/\d+/g) || [null, "0"])[2] || "0",
                    logins: {
                        thirty_minutes: ((str.match(animal_crossing_ds.logins) || ["0"])[0].match(/(\d|&mdash;)+/g)[3] || "0").replace(/&mdash;/g, "0"),
                        four_hours: ((str.match(animal_crossing_ds.logins) || ["0"])[0].match(/(\d|&mdash;)+/g)[4] || "0").replace(/&mdash;/g, "0"),
                        twentyfour_hours: ((str.match(animal_crossing_ds.logins) || ["0"])[0].match(/(\d|&mdash;)+/g)[5] || "0").replace(/&mdash;/g, "0")
                    }
                  }
                };
              
                // ---------------------
                // Queries
                // ---------------------
              
                db.all("select * from games").then(r => {
                  if(r.some(element => element.game === "acrossingds")){
                    db.run(`UPDATE games SET totalProfiles=${Number(result.animal_crossing_ds.totalProfiles)}, online=${Number(result.animal_crossing_ds.online)}, lastEdit='${Date.now()}', thirtyMinutes=${Number(result.animal_crossing_ds.logins.thirty_minutes)}, fourHours=${Number(result.animal_crossing_ds.logins.four_hours)}, twentyfourHours=${Number(result.animal_crossing_ds.logins.twentyfour_hours)} WHERE game="acrossingds"`).catch(console.log)
                  } else {
                    db.run(`INSERT INTO games VALUES ("acrossingds", ${Number(result.animal_crossing_ds.totalProfiles)}, ${Number(result.animal_crossing_ds.online)}, '${Date.now()}', ${Number(result.animal_crossing_ds.logins.thirty_minutes)}, ${Number(result.animal_crossing_ds.logins.four_hours)}, ${Number(result.animal_crossing_ds.logins.twentyfour_hours)}, null )`).catch(console.log)
                  }
                  
                  if(r.some(element => element.game === "ssbb")){
                    db.run(`UPDATE games SET totalProfiles=${Number(result.ssbb.totalProfiles)}, online=${Number(result.ssbb.online)}, lastEdit='${Date.now()}', thirtyMinutes=${Number(result.ssbb.logins.thirty_minutes)}, fourHours=${Number(result.ssbb.logins.four_hours)}, twentyfourHours=${Number(result.ssbb.logins.twentyfour_hours)} WHERE game="ssbb"`).catch(console.log)
                  } else {
                    db.run(`INSERT INTO games VALUES ("ssbb", ${Number(result.ssbb.totalProfiles)}, ${Number(result.ssbb.online)}, '${Date.now()}', ${Number(result.ssbb.logins.thirty_minutes)}, ${Number(result.ssbb.logins.four_hours)}, ${Number(result.ssbb.logins.twentyfour_hours)}, null )`).catch(console.log)
                  }
                  
                  
                }).catch(error => {
                  if (error.toString().includes("no such table: games")) {
                        return db.run("CREATE TABLE `games` ( `game` TEXT, `totalProfiles` INTEGER, `online` INTEGER, `lastEdit` TEXT, `thirtyMinutes` INTEGER, `fourHours` INTEGER, `twentyfourHours` INTEGER, `sevenDays` INTEGER )").catch(console.log);
                    } else console.log(error.toString());
                });
                
            });
        });
    };
} catch (e) {
    console.log(e)
}
