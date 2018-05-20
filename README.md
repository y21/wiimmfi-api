# wiimmfi-api

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9ee46ec893de4624b946b9bf712d6171)](https://app.codacy.com/app/y21/wiimmfi-api?utm_source=github.com&utm_medium=referral&utm_content=y21/wiimmfi-api&utm_campaign=badger)

Public API to get information about mkwii rooms<br/>
<a href="https://wiimmfi.glitch.me/">Demo</a> | <a href="https://wiimmfi.de/mkw/list">Room list</a> | <a href="https://wiimmfi.de">Wiimmfi</a>

## Notice
This is an **unofficial** API and is **not** affiliated with wiimmfi. Provided data *can* be inaccurate or wrong because of frontend code modifications, but this should not happen often.<br/>
The official wii online service <a href="https://wiimmfi.de/">wiimmfi</a> was made by Leseratte and Wiimm! 

### Code
This project was written in javascript and uses the web framework express. It uses nodejs for backend code such as running the webserver.
If you want to run a private instance, please make sure that you're running >= node.js v8.<br/>
To check your node version, simply type `node -v` in your command prompt.

### What it does
As mentioned above, this project uses express as webserver. Every file in `~/routes` except the directory itself will be included as an api endpoint, means if you add a valid javascript file in there, it will call that function every time with both a request and a response parameter.<br/>
Since <a href="https://wiimmfi.de/">wiimmfi</a> is using Hypertext Transfer Protocol Secure (HTTPS), this is using the nodejs built in HTTPS module. 
All endpoints will probably be a bit slow because of the extremely huge html source on wiimmfi's site. It has about 5000 lines, so it's self-explanatory why it's taking so long.

------
# Endpoints

### amount
> Format: JSON

Parameters: *none*

Description: This endpoint returns the amount of available worldwides, continentals, privates, total worldwides, total continentals, tital privates, total players and players in available rooms.
#### Example Response
```json
{
    "total": {
        "worldwides": "139",
        "continentals": "61",
        "privates": "107",
        "players": "2014"
    },
    "available": {
        "worldwides": "6",
        "continentals": "1",
        "privates": "7",
        "players": "95"
    },
    "lastCheck": "1525195337486",
    "status": 200
}
```

### regions
> Format: JSON

Parameters: *none*

Description: This endpoint returns the amount of players logged in for each region which can be either CTGP, Jap/0, Ame/1 or Eur/2.
### Example Response
```json
{
    "ctgp": 18,
    "eur": 52,
    "jap": 3,
    "ame": 24
}
```

### findUser
> Format: JSON

#### Warning
This may not work for every user that has weird characters in it; most likely hacked mii names. It also won't find players that are playing with 2 or more players (split-screen).

Parameters: 

| Parameter     | Description   |
| ------------- | --------------|
| name          | The username of the player to search for
| flags         | Flags; `i` = includes, search by name includes (optional)


### users
> Format: JSON

Parameters: *none*

Description: This endpoint returns an array of users in all rooms.
### Example Response
```js
[
    "YTubeCCCLP",
    "XXLMario",
    "1. Liam<br/>2. Jan-Robert",
    "Pietro",
    "Sabrii»♪",
    "hammy",
    "_Shadder2K",
    "Dave",
    "MKT☆mιζμεχ",
    "♪♪Tumi™♪♪",
    "λ★lcohol",
    "Soporific"
]
```
