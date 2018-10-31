const { get } = require("https");

module.exports = (req, res) => {
    get("https://wiimmfi.de/mkw/list", result => {
        let str = "";

        result.on("data", d => str += d);
        result.on("end", () => {
            const userMatch = (str.match(new RegExp("<td align=\"center\".+<td align=center>(\\d{4}|—)<\/td>\\s*<td align=center>(\\d{4}|—)<\/td>\\s*<td>.+<\/td>", "g")) || []).map(e => {
                return e.split(/(<td align="center">|<\/td>|<td align="center">|<td align="center" title="[\w\s]+">|<td>)/);
            });
            res.send(userMatch.map(e => e[e.length-3]));
        });
    });

};
