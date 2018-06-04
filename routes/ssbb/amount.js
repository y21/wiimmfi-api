const { db } = require("../../Base");

/**
 * Amount endpoint (ssbb);
 *
 * @param req Request object (express)
 * @param res Response object (express)
 */
module.exports = (req, res) => {
    db.get("select * from ssbb").then(result => {
        const re = {
            totalProfiles: result.totalProfiles,
            online: result.online,
            lastCheck: result.lastEdit,
            logins: {
                thirty_minutes: result.thirtyMinutes,
                four_hours: result.fourHours,
                twentyfour_hours: result.twentyfourHours
            },
            status: 200
        };
        res.json(re);
    });
};
