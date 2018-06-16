const { db } = require("../../Base");

/**
 * Amount endpoint (acrossingds);
 *
 * @param req Request object (express)
 * @param res Response object (express)
 */
module.exports = (req, res) => {
    db.get("SELECT * FROM games WHERE game=\"acrossingds\"").then(result => {
      if(!result) return res.json({ status: 500, message: "data is not initalized yet." });
        res.json({
            totalProfiles: result.totalProfiles,
            online: result.online,
            logins: {
                thirty_minutes: result.thirtyMinutes,
                four_hours: result.fourHours,
                twentyfour_hours: result.twentyfourHours
            },
            lastCheck: result.lastEdit,
            status: 200
        });
    });
};
