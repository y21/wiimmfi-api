const { get } = require('https'); // will be used for requests

module.exports = (req, res) => {
  let str = '';
  get('https://wiimmfi.de/mkw/list', (re) => {
    re.on('data', d => {
      str += d;
    });
    re.on('end', () => {
        const availableRoomsSource = str.substr(0, str.search(/List all MKW rooms\.<\/a><br\/>/));
        let result = {
            status: 200,
            totalAvailable: {
                worldwides: availableRoomsSource.split(/Worldwide *room/i).length-1,
                continentals: availableRoomsSource.split(/Continental *room/i).length-1,
                privates: availableRoomsSource.split(/Private *room/).length-1
            },
            total: {
                worldwides: str.split(/worldwide room/i).length-1,
                continentals: str.split(/continental room/i).length-1,
                privates: str.split(/private room/i).length-1
            }
        };
      res.json(result);
    });
  });
}
