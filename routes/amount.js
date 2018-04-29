const { get } = require('https'); // will be used for requests

module.exports = (req, res) => {
  let str = '';
  get('https://wiimmfi.de/mkw/list', (re) => {
    re.on('data', d => {
      str += d;
    });
    re.on('end', () => {
        let result = {
            status: 200,
            totalAvailable: {
                amount: str.split(/<img src="\/images\/watch-room-24x16\.png" *class="text-img"><\/a>/).length-1,
            },
            total: {
                amount: str.split(/friend code/).length-1
            }
        };
      res.json(result);
    });
  });
}
