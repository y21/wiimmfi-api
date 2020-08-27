# wiimmfi-api

This is a public API to get information about games on Wiimmfi.
<a href="https://wiimmfi-api--y21-.repl.co/">Demo</a> | <a href="https://wiimmfi.de">Wiimmfi</a>

## Notice
This is an **unofficial** API and is **not** affiliated with Wiimmfi. Provided data *can* be inaccurate or wrong because of frontend code modifications, but this should not happen often.<br/>
The Nintendo WFC replacement server called <a href="https://wiimmfi.de/">Wiimmfi</a> was made by Leseratte and Wiimm! 

## API Docs
- Base URL: /api/v2

### /{game}/overview
`{game}`: Game ID, can be found on [this](https://wiimmfi.de/stat?m=28) page (ID column)<br/>
Returns information for a game. Do note that the game ID needs to be in lowercase letters<br/>
Example request:
```sh
~$ curl https://wiimmfi-api--y21-.repl.co/api/v2/rmcj/overview

{"data":{"totalProfiles":337,"online":385,"logins":10061}}
```

### /mkw/rooms
Returns number of rooms for each type (worldwides, continentals, privates, ...).<br/>
Example request:
```sh
~$ curl https://wiimmfi-api--y21-.repl.co/api/v2/mkw/rooms

{"worldwides":118,"continentals":108,"privates":185,"players":0}
```

### /mkw/regions
Returns number of login regions for each type (ctgp, america, ...)
Example request:
```sh
~$ curl https://wiimmfi-api--y21-.repl.co/api/v2/mkw/regions

{"ctgp":2620,"ame":105,"jap":468,"eur":379}
```
