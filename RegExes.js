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
        thirty_minutes: /<td *align *= *"?center"? *> *\d+ *<\/td> *<td *align *= *"?center"? *> *<a *href *= *"\/game\/smashbrosxwii" *>\d+<\/a><\/td> *<td *align *= *center *>\d+<\/td>/i
    }
};