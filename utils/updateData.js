const { get } = require("https");
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
                        worldwides: str.split(/Worldwide *room/i).length - 1,
                        continentals: str.split(/Continental *room/i).length - 1,
                        privates: str.split(/Private *room/).length - 1,
                        players: str.split(/<td>.{1,28}<\/td>/).length - 1
                    },

                    // regions endpoint (for available rooms)
                    ctgp: str.split(/<td align *= *"center" *> *CTGP *<\/td *>/).length - 1,
                    eur: str.split(/<td align *= *"center" *> *Eur\/2 *<\/td *>/).length - 1,
                    jap: str.split(/<td align *= *"center" *> *Jap\/0 *<\/td *>/).length - 1,
                    ame: str.split(/<td align *= *"center" *> *Ame\/1 *<\/td *>/).length - 1
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
            re.on("end", d => {
                result = {
                    totalProfiles: ((str.match(/<td *align *= *"?center *"?> *\d+ *<\/td> *<td *align *= *"?center *"?><a *href *= *"\/game\/smashbrosxwii" *> *\d+ *<\/a>/) || ["0"])[0].match(/\d+/) || ["0"])[0],
                    online: ((str.match(/<td *align *= *"?center *"?> *\d+ *<\/td> *<td *align *= *"?center *"?><a *href *= *"\/game\/smashbrosxwii" *> *\d+ *<\/a>/) || ["0"])[0].match(/\d+/g) || [null, "0"])[1]
                };

                // ---------------------
                // Queries
                // ---------------------

                db.all("select * from ssbb").then(r => {
                    if (r.length === 0) return db.run(`insert into ssbb values(${Number(result.totalProfiles)}, ${Number(result.online)}, '${Date.now()}')`).catch(console.log);
                    else db.run("update ssbb set totalProfiles=" + Number(result.totalProfiles) + ", online=" + Number(result.online) + ", lastEdit='" + Date.now() + "'").catch(console.log);
                }).catch(error => {
                    if (error.toString().includes("no such table: ssbb")) {
                        return db.run("CREATE TABLE `ssbb` ( `totalProfiles` INTEGER, `online` INTEGER, `lastEdit` TEXT )").catch(console.log);
                    } else console.log(error.toString());
                });
            });
        });

    };
} catch (e) {
    console.log(e);
}
