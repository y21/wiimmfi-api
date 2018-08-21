const { get } = require("https");

/**
 * findUser endpoint; get information about a player (has to be in a room!)
 *
 * @param req Request object (express)
 * @param res Response object (express)
 */
module.exports = (req, res) => {
    const nameParameter = req.headers.name || req.query.name;
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

            const userMatch = (str.match(new RegExp("<td align=\"center\">(CTGP|Eur|Jap|Ame)\\/?\\d?<\\/td>\\s*<td align=\"center\">.{1,16}<\\/td>\\s*<td align=\"center\">.{1,16}<\\/td>\\s*<td align=\"center\".{1,128}<\\/td>\\s*<td align=\"center\">.{1,16}<\\/td>\\s*<td align=\"center\">.{1,16}<\\/td>\\s*<td>" + ((req.query.flags || "").split(",").includes("i") ? `.*${escapedNickname}.*` : escapedNickname) + "<\\/td>", "g")) || []).map(e => {
                return e.split(/(<td align="center">|<\/td>|<td align="center">|<td align="center" title="[\w\s]+">|<td>)/);
            });
            if(!userMatch[0]) return res.json({ status: 400, message: "user not found" });
            res.json({
                status: 200,
                data: {
                    VR: (userMatch[0] || []).find(e => /\d{4}/g.test(e)) || "-",
                    BR: (userMatch[0] || []).slice(userMatch[0].findIndex(e => /\d{4}/g.test(e))+1).find(e => /\d{4}/g.test(e)) || "-",
                    loginRegion: (userMatch[0] || [])[2],
                    gameType: (userMatch[0] || []).find(e => e.includes("vs")) ? "versus" : "battle",
                    connectionFail: (userMatch[0] || []).find(e => /\d\.\d{2}$/.test(e)) ? userMatch[0].find(e => /\d\.\d{2}$/.test(e)).substr(userMatch[0].find(e => /\d\.\d{2}$/.test(e)).search(/\d\.\d{2}/)) : false,
                }
            });
        });
    });
};
