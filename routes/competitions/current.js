const { get } = require("https");

module.exports = (req, res) => {
    get("https://competition.wiimmfi.de/", (re) => {
        let str = "";
        re.on("data", d => str += d);
        re.on("end", () => {
            str = str.substr(str.indexOf("<div class=\"text\"") + 19);
            let result = {
                name: str.match(/<h2 *class *= *"? *subhead *"? *>.+<\/h2>/)[0],
                subhead: str.match(/<div *class *= *"? *subhead *"? *>.+<\/div>/)[0].replace(/<span *title *= *\'.*\'>|<\/span>/g, ""),
                ends: str.match(/The competition ends on \w+ \d+ \w+ \d+, \d+:\d+ (PM|AM)/)[0],
                description: str.match(/Wii description of the competition *<\/b> *<\p>.*<\/div> *<\/a> *<\/span>/)[0].replace(/<br\/?>/g, "\n")
            };

            result.name = result.name.substr(result.name.indexOf(">") + 1);
            result.name = result.name.slice(0, -5);
            result.subhead = result.subhead.substr(result.subhead.indexOf(">") + 1);
            result.subhead = result.subhead.slice(0, -6);
            result.ends = result.ends.substr(result.ends.search(/ on/) + 4);
            result.description = result.description.substr(result.description.indexOf("<p>") + 3);
            result.description = result.description.slice(0, -17)
            res.json(result);
        });
    })
}
