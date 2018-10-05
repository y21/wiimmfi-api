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
                let temp = {
                    ssbb: ssbb.totalProfiles.exec(str),
                    acds: animal_crossing_ds.exec(str)
                };
                result = {
                    ssbb: {
                        totalProfiles: parseInt(temp.ssbb[1]) || 0,
                        online: parseInt(temp.ssbb[2]) || 0,
                        logins: {
                            thirty_minutes: parseInt(temp.ssbb[5]) || 0,
                            four_hours: parseInt(temp.ssbb[6]) || 0,
                            twentyfour_hours: parseInt(temp.ssbb[7]) || 0
                        }
                    },
                    animal_crossing_ds: {
                        totalProfiles: parseInt(temp.acds[1]) || 0,
                        online: parseInt(temp.acds[2]) || 0,
                        logins: {
                            thirty_minutes: parseInt(temp.acds[3]) || 0,
                            four_hours: parseInt(temp.acds[4]) || 0,
                            twentyfour_hours: parseInt(temp.acds[5]) || 0
                        }
                    }
                };
                console.log(result.ssbb);

                // &mdash; fixes
                if(isNaN(result.animal_crossing_ds.online)) result.animal_crossing_ds.online = 0;
                if(isNaN(result.animal_crossing_ds.logins.four_hours)) result.animal_crossing_ds.logins.thirty_minutes = 0;
                if(isNaN(result.animal_crossing_ds.logins.four_hours)) result.animal_crossing_ds.logins.four_hours = 0;
                if(isNaN(result.animal_crossing_ds.logins.twentyfour_hours)) result.animal_crossing_ds.logins.twentyfour_hours = 0;
                
                // ---------------------
                // Queries
                // ---------------------
              
                db.all("select * from games").then(r => {
                  if(r.some(element => element.game === "acrossingds")){
                    db.run(`UPDATE games SET totalProfiles=${Number(result.animal_crossing_ds.totalProfiles)}, online=${Number(result.animal_crossing_ds.online)}, lastEdit='${Date.now()}', thirtyMinutes=${Number(result.animal_crossing_ds.logins.thirty_minutes)}, fourHours=${Number(result.animal_crossing_ds.logins.four_hours)}, twentyfourHours=${Number(result.animal_crossing_ds.logins.twentyfour_hours)} WHERE game="acrossingds"`).catch(console.log);
                  } else {
                    db.run(`INSERT INTO games VALUES ("acrossingds", ${Number(result.animal_crossing_ds.totalProfiles)}, ${Number(result.animal_crossing_ds.online)}, '${Date.now()}', ${Number(result.animal_crossing_ds.logins.thirty_minutes)}, ${Number(result.animal_crossing_ds.logins.four_hours)}, ${Number(result.animal_crossing_ds.logins.twentyfour_hours)}, null )`).catch(console.log);
                  }
                  
                  if(r.some(element => element.game === "ssbb")){
                    db.run(`UPDATE games SET totalProfiles=${Number(result.ssbb.totalProfiles)}, online=${Number(result.ssbb.online)}, lastEdit='${Date.now()}', thirtyMinutes=${Number(result.ssbb.logins.thirty_minutes)}, fourHours=${Number(result.ssbb.logins.four_hours)}, twentyfourHours=${Number(result.ssbb.logins.twentyfour_hours)} WHERE game="ssbb"`).catch(console.log);
                  } else {
                    db.run(`INSERT INTO games VALUES ("ssbb", ${Number(result.ssbb.totalProfiles)}, ${Number(result.ssbb.online)}, '${Date.now()}', ${Number(result.ssbb.logins.thirty_minutes)}, ${Number(result.ssbb.logins.four_hours)}, ${Number(result.ssbb.logins.twentyfour_hours)}, null )`).catch(console.log);
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
    console.log(e);
}
