const { get } = require('https'); // will be used for requests

module.exports = (req, res) => {
  let str = '';
  get('https://wiimmfi.de/mkw/list', (re) => {
    re.on('data', d => {
      str += d;
    });
    re.on('end', () => {
      res.json({ status: 200, rooms: str.split(/<img src="\/images\/watch-room-24x16\.png" *class="text-img"><\/a>/).length });
    });
  });
}
