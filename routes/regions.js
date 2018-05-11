const { db } = require("../Base");

/**
 * Regions endpoint;
 *
 * @param req Request object (express)
 * @param res Response object (express)
 */
module.exports = (req, res) => {
    db.get("select * from region_amount").then(result => {
        res.json({
            ctgp: result.ctgp,
            eur: result.eur,
            jap: result.jap,
            ame: result.ame
        });
    });
};
