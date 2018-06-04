const { db } = require("../../Base");

/**
 * Amount endpoint (ssbb);
 *
 * @param req Request object (express)
 * @param res Response object (express)
 */
module.exports = (req, res) => {
    db.get("select * from ssbb").then(result => {
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
