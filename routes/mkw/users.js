const { get } = require("https");

module.exports = (req, res) => {
    get("https://wiimmfi.de/mkw/list", result => {
        let str = "";

        result.on("data", d => str += d);
        result.on("end", () => {
            const userMatch = (str.match(new RegExp("<td align=\"center\">(CTGP|Eur|Jap|Ame)\\/?\\d?<\\/td>\\s*<td align=\"center\">.{1,16}<\\/td>\\s*<td align=\"center\">.{1,16}<\\/td>\\s*<td align=\"center\".{1,128}<\\/td>\\s*<td align=\"center\">.{1,16}<\\/td>\\s*<td align=\"center\">.{1,16}<\\/td>\\s*<td>.*<\\/td>", "g")) || []).map(e => {
                return e.split(/(<td align="center">|<\/td>|<td align="center">|<td align="center" title="[\w\s]+">|<td>)/);
            });
            res.send(userMatch.map(e => e[e.length-3]));
        });
    });

};
