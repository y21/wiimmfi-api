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
                status: 200,
                totalAvailable: {
                    worldwides: availableRoomsSource.split(/Worldwide *room/i).length-1,
                    continentals: availableRoomsSource.split(/Continental *room/i).length-1,
                    privates: availableRoomsSource.split(/Private *room/).length-1
                },
                total: {
                    worldwides: str.split(/worldwide room/i).length-1,
                    continentals: str.split(/continental room/i).length-1,
                    privates: str.split(/private room/i).length-1
                }
            };
            db.get('select * from totalAmount').then(r => {
                if(!r) return db.run(`insert into totalAmount values ('${result.total.worldwides}', '${result.total.continentals}', '${result.total.privates}', '${result.totalAvailable.worldwides}', '${result.totalAvailable.continentals}', '${result.totalAvailable.privates}', '${Date.now()}')`).catch(console.log);
                else db.run(`update totalAmount set totalWWs='${result.total.worldwides || 0}', totalContinentals='${result.total.continentals || 0}', totalPrivates='${result.total.privates || 0}', WWs='${result.totalAvailable.worldwides || 0}', continentals='${result.totalAvailable.continentals || 0}', privates='${result.totalAvailable.privates || 0}', lastEdit='${Date.now()}'`).catch(console.log);
            });
        });
    });
};
