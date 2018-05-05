const { get } = require('https');

/**
 * findUser endpoint; get information about a player (has to be in a room!)
 *
 * @param req Request object (express)
 * @param res Response object (express)
 */
module.exports = (req, res) => {
    if (!req.query.name) return res.json({status: 400, message: 'No name parameter provided'});
    get('https://wiimmfi.de/mkw/list', result => {
        let str = '';
        result.on('data', d => str += d);
        result.on('end', () => {
            str = str.substr(str.indexOf('<th>friend code</th>'));
            const userMatch = (str.match(new RegExp('<td align="center">(CTGP|Eur|Jap|Ame)\\/\\d?<\\/td>\\s*<td align="center">.{1,16}<\\/td>\\s*<td align="center">.{1,16}<\\/td>\\s*<td align="center".{1,128}<\\/td>\\s*<td align="center">.{1,16}<\\/td>\\s*<td align="center">.{1,16}<\\/td>\\s*<td>' + req.query.name + '<\\/td>', 'g')) || []).map(e=>{
                return e.split(/(<td align="center">|<\/td>|<td align="center">|<td align="center" title="[\w\s]+">|<td>)/)
            });
            str = str.substr(str.indexOf('<th>friend code</th>'));
            res.json({
                status: 200,
                data: {
                    VR: parseInt((userMatch[0] || []).find(e=>/\d{4}/g.test(e)))
                }
            });
        });
    });
};
