const { db } = require("../../../Base");

/**
 * Amount endpoint;
 *
 * @param req Request object (express)
 * @param res Response object (express)
 */
module.exports = (req, res) => {
    db.get("select * from totalAmount").then(result => {
        const re = {
            available: {
                worldwides: result.WWs,
                continentals: result.continentals,
                privates: result.privates,
                players: result.players
            },
            lastCheck: result.lastEdit,
            status: 200
        };
        res.json(re);
    });
};
