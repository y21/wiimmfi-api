module.exports = {
    mkwii: {
        worldwides: /Worldwide *room/i,
        continentals: /Continental *room/i,
        privates: /Private *room/i,
        players: /<td>.{1,28}<\/td>/,
        ctgp: /<td align *= *"center" *> *CTGP *<\/td *>/i,
        eur: /<td align *= *"center" *> *Eur\/2 *<\/td *>/i,
        jap: /<td align *= *"center" *> *Jap\/0 *<\/td *>/i,
        ame: /<td align *= *"center" *> *Ame\/1 *<\/td *>/i
    },
    ssbb: {
        totalProfiles: /<td *align *= *"?center *"?> *\d+ *<\/td> *<td *align *= *"?center *"?><a *href *= *"\/game\/smashbrosxwii" *> *\d+ *<\/a>/,
        logins: /<td *align *= *"?center"? *> *\d+ *<\/td> *<td *align *= *"?center"? *> *<a *href *= *"\/game\/smashbrosxwii" *>\d+<\/a><\/td> *<td *align *= *center *>\d+<\/td><td align=center>\d+<\/td><td align=center>\d+<\/td>/i
    },
    animal_crossing_ds: /<tr class="tr0"><td title="acrossingds">ADME<\/td>.+\s+.+/g,
    bans: {
        col1: /<tr *id *= *"?pager-\d{1,10}-\d{1,3}-0 *class *= *"?anchor *tr[01] *"?> *<td *align *= *"?center"? *>\d+.+/g,
        col1_ban_id: /\d{4,8}(?=<\/td> *<td *align *="?center *"? *class *= *"?nobr)/g
    }
};
