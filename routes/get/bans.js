const { get } = require("https"),
    { bans } = require("../../RegExes");

/**
 * Bans endpoint (wiimmfi bans in general)
 *
 * @param req Request object (express)
 * @param res Response object (express)
 */
module.exports = (req, res) => {
    get("https://wiimmfi.de/show-bans", (re) => {
        let str = "";

        re.on("data", (d) => {
            str += d;
        });

        re.on("end", () => {
            /*[
                {
                    name: "hi",
                    friendcode: "1234-5678-9012",
                    game: "Mario Kart Wii",
                    ban_id: "1",
                    expires: "12m, 21:02:53",
                    expired: null,
                    reason: "Other",
                    ban: {
                        category: "Room kick",
                        info: "Room owner kicked a guest."
                    }
                }
            ]*/

            let col1s = str.match(bans.col1),
                result = new Array();
            col1s = col1s.slice(0, req.query.limit || 10);
            
            for(const match of col1s) {
                let nameStep = match.substr(match.indexOf("\"nobr mii-font\">") + 16),
                    reasonStep = match.substr(match.search(/<td *rowspan *= *\d+ *>/));
                reasonStep = reasonStep.substr(reasonStep.indexOf(">") + 1);
                reasonStep = reasonStep.substr(0, reasonStep.indexOf("</td>")).replace(/<br *\/?>/g, "\n");
                if(reasonStep.endsWith("\n")) reasonStep = reasonStep.slice(0, -1);
                result.push({
                    name: nameStep.substr(0, nameStep.indexOf("</td>")),
                    reason: reasonStep,
                    ban_id: match.match(bans.col1_ban_id)[0]
                });
            }

            res.send(result);
        });
    });
}