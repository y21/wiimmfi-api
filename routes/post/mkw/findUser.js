const { get } = require("https");

module.exports = async (req, res) => {
    const nameParameter = (req.body) ? req.body.name : false || req.headers.name || req.query.name;
    if (!nameParameter) return res.json({status: 400, message: "No name parameter provided"});
    get("https://wiimmfi.de/mkw/list", result => {
        let str = "";
        result.on("data", d => str += d);
        result.on("end", () => {
            str = str.substr(str.indexOf("<th>friend code</th>"));

            // Automatically escape special regex characters
            let escapedNickname = nameParameter;
            if(escapedNickname.constructor.name === "Array") escapedNickname = escapedNickname[0];
            if(typeof escapedNickname !== "string") return res.json({status: 400, message: "name header is not typeof array."});
            ["*", "^", "$", "?", "\\d", "\\w", "\\n", "\\s", "(", ")", "+", "[", "]", "-"].map(r => escapedNickname = escapedNickname.replace(new RegExp("\\"+r, "g"), "\\" + r));

            const userMatch = (str.match(new RegExp("<td align=\"center\".+<td align=center>(\\d{4}|—)<\/td>\\s*<td align=center>(\\d{4}|—)<\/td>\\s*<td>(" + escapedNickname + ")<\/td>", "g")) || []).map(e => {
                return e.split(/(<td align="center">|<\/td>|<td align="center">|<td align="center" title="[\w\s]+">|<td>)/);
            });
            if(!userMatch[0]) return res.json({ status: 400, message: "user not found" });
            res.json({
                status: 200,
                data: {
                    VR: ((((userMatch[0] || []).find(e => /\d{4}/g.test(e)) || "") || []).match(/\d{4}/) || ["-"])[0],
                    BR: (((userMatch[0] || []).slice(userMatch[0].findIndex(e => /\d{4}/g.test(e))+1).find(e => /\d{4}/g.test(e)) || "").match(/\d{4}/) || ["-"])[0],
                    loginRegion: "-",
                    gameType: (userMatch[0] || []).find(e => e.includes("vs")) ? "versus" : "other",
                    connectionFail: ((userMatch[0] || [])[0].match(/(\d\.\d{2}|—)/) || ["-"])[0]
                }
            });
        });
    });
};
