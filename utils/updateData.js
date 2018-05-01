const { get } = require('https');

/**
 * Updates the database.
 *
 * @param db SQLite database
 * @param data An object with information such as amount of total WWs, total continentals, total privates etc.
 */
module.exports = (db) => {
    let str = '', result = { };
    get('https://wiimmfi.de/mkw/list', (re) => {
        re.on('data', d => {
            str += d;
        });
        re.on('end', () => {
            const availableRoomsSource = str.substr(0, str.search(/List all MKW rooms\.<\/a><br\/>/));
            result = {
                // amount endpoint
                status: 200,
                totalAvailable: {
                    worldwides: availableRoomsSource.split(/Worldwide *room/i).length-1,
                    continentals: availableRoomsSource.split(/Continental *room/i).length-1,
                    privates: availableRoomsSource.split(/Private *room/).length-1,
                    players: availableRoomsSource.split(/<td>.{1,28}<\/td>/).length-1
                },
                total: {
                    worldwides: str.split(/worldwide room/i).length-1,
                    continentals: str.split(/continental room/i).length-1,
                    privates: str.split(/private room/i).length-1,
                    players: str.split(/<td>.{1,28}<\/td>/).length-1
                },

                // regions endpoint (for available rooms)
                ctgp: availableRoomsSource.split(/<td align *= *"center" *> *CTGP *<\/td *>/).length-1,
                eur: availableRoomsSource.split(/<td align *= *"center" *> *Eur\/2 *<\/td *>/).length-1,
                jap: availableRoomsSource.split(/<td align *= *"center" *> *Jap\/0 *<\/td *>/).length-1,
                ame: availableRoomsSource.split(/<td align *= *"center" *> *Ame\/1 *<\/td *>/).length-1
            };


            // ---------------------
            // Queries
            // ---------------------


            //  TotalAmount Queries
            db.all('select * from totalAmount').then(r => {
                if(typeof r === 'undefined') return db.run('CREATE TABLE "totalAmount" ( `totalWWs` TEXT, `totalContinentals` TEXT, `totalPrivates` TEXT, `WWs` TEXT, `continentals` TEXT, `privates` TEXT, `lastEdit` TEXT, `players` TEXT, `totalPlayers` TEXT )');
                else if(r.length == 0) return db.run(`insert into totalAmount values ('${result.total.worldwides}', '${result.total.continentals}', '${result.total.privates}', '${result.totalAvailable.worldwides}', '${result.totalAvailable.continentals}', '${result.totalAvailable.privates}', '${Date.now()}', '${result.totalAvailable.players}', '${result.total.players}')`).catch(console.log);
                else db.run(`update totalAmount set totalWWs='${result.total.worldwides || 0}', totalContinentals='${result.total.continentals || 0}', totalPrivates='${result.total.privates || 0}', WWs='${result.totalAvailable.worldwides || 0}', continentals='${result.totalAvailable.continentals || 0}', privates='${result.totalAvailable.privates || 0}', lastEdit='${Date.now()}', players='${result.totalAvailable.players}', totalPlayers='${result.total.players}'`).catch(console.log);
            }).catch(error => {
                if(error.toString().includes('no such table: totalAmount')){
                    return db.run('CREATE TABLE "totalAmount" ( `totalWWs` TEXT, `totalContinentals` TEXT, `totalPrivates` TEXT, `WWs` TEXT, `continentals` TEXT, `privates` TEXT, `lastEdit` TEXT, `players` TEXT, `totalPlayers` TEXT )');
                }
                else console.log(error.toString());
            });

            // Regions Queries
            db.all('select * from region_amount').then(r => {
                if(r.length == 0) return db.run(`insert into region_amount values('${result.eur}', '${result.jap}', '${result.ctgp}', '${result.ame}')`);
                else db.run(`update region_amount set eur='${result.eur}', jap='${result.jap}', ctgp='${result.ctgp}', ame='${result.ame}'`);
            }).catch(error => {
                if(error.toString().includes('no such table: region_amount')){
                    return db.run('CREATE TABLE `region_amount` ( `eur` INTEGER, `jap` INTEGER, `ctgp` INTEGER, `ame` INTEGER )');
                }
                else console.log(error.toString());
            });
        });
    });
};
