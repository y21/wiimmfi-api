const { get } = require('https'); // will be used for requests
const { db } = require('../Base');

/**
 * Amount endpoint;
 *
 * @param req Request object (express)
 * @param res Response object (express)
 */
module.exports = (req, res) => {
    db.get('select * from totalAmount').then(result => {
        const re = {
            total: {
                worldwides: result.totalWWs,
                continentals: result.totalContinentals,
                privates: result.totalPrivates
            },
            available: {
                worldwides: result.WWs,
                continentals: result.continentals,
                privates: result.privates
            },
            lastCheck: result.lastEdit,
            status: 200
        };
        res.json(re);
    });
};
