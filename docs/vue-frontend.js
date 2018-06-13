new Vue({
    el: "#app",
    data: {
        app: {
            name: "wiimmfi-api",
            links: {
                github: "https://github.com/y21/wiimmfi-api/",
                discord: "https://discord.gg/6DPWSmK/",
                gh_releases: "https://github.com/y21/wiimmfi-api/releases",
                about_page: "about.html",
                endpoints: "endpoints.html",
                supported_games: "supported.html"
            },
            changelog: [{
                  date: "13th June 2018",
                  contents: [
                      "Animal Crossing (DS) is now supported by this api."
                  ]
                },
                {
                    date: "1st June 2018",
                    contents: [
                        "Name can be passed as header and as a POST parameter now"
                    ]
                },
                {
                    date: "31th May 2018",
                    contents: [
                        "SQLite (structure) fixes: lastEdit' row type was INTEGER instead of TEXT",
                        "Catch promise rejections in utils#updateData"
                    ]
                },
                {
                    date: "30th May 2018",
                    contents: [
                        "(Proper) <a href=\"#\" class=\"nlink\">documentation</a> has been finished.",
                        "Add vue to documentation"
                    ]
                },
                {
                    date: "21st May 2018",
                    contents: [
                        "Add super smash bros brawl online support to api. (<a href=\"https://github.com/y21/wiimmfi-api/commit/6f18f41add3e8ba2bccfd990369f01d99a0ba08a\" class=\"nlink\">PR#3</a>)",
                        "Fix SQLite table bugs"
                    ]
                },
                {
                    date: "20th May 2018",
                    contents: [
                        "Bug fix where CTGP players didn't show up as online"
                    ]
                },
                {
                    date: "20th May 2018",
                    contents: [
                        "Bug fix where CTGP players didn't show up as online"
                    ]
                },
                {
                    date: "13th May 2018",
                    contents: [
                        "Fix VR/BR being swapped",
                        "Flags support"
                    ]
                },
                {
                    date: "11th May 2018",
                    contents: [
                        "Codacy refactor"
                    ]
                },
                {
                    date: "10th May 2018",
                    contents: [
                        "Codacy refactor"
                    ]
                },
                {
                    date: "7th May 2018",
                    contents: [
                        "Escape special regex characters such as * + ( ) [ ] ."
                    ]
                },
                {
                    date: "1st May 2018",
                    contents: [
                        "regions endpoint added"
                    ]
                },
                {
                    date: "30th May 2018",
                    contents: [
                        "Use SQLite as database to store information"
                    ]
                }
            ],
            endpoints: [
                // Mario Kart Wii
                {
                    name: "amount",
                    http_method: [
                        "get"
                    ],
                    desc: "This endpoint returns the amount of available worldwides, continentals, privates, total worldwides, total continentals, total privates, total players and players in available rooms.",
                    format: "JSON",
                    parameters: [],
                    response: "https://gist.githubusercontent.com/y21/6d9fc80d8404867855e54367007a10e3/raw/6944cc5f26c864d6810e089ba9e61c3c83f5edee/amount.json"
                },
                {
                    name: "regions",
                    http_method: [
                        "get"
                    ],
                    desc: "This endpoint returns the amount of players logged in for each region which can be either CTGP, Jap/0, Ame/1 or Eur/2.",
                    format: "JSON",
                    parameters: [],
                    response: "https://gist.githubusercontent.com/y21/6d9fc80d8404867855e54367007a10e3/raw/8f914fe8ed761c93740e4ae6c5a3e407a7faeb36/regions.json"
                },
                {
                    name: "findUser",
                    http_method: [
                        "get",
                        "post"
                    ],
                    desc: "This endpoint returns information about a user such as VR, BR, etc. This may not work for every user that has weird characters in it; most likely hacked mii names. It also won't find players that are playing with 2 or more players (split-screen) if the i flag has not been set.<br/>name parameter can be either passed as a GET, POST or header.",
                    format: "JSON",
                    parameters: [{
                            name: "name",
                            desc: "The mii name of the player"
                        },
                        {
                            name: "flag",
                            desc: "[optional] Flags; i = includes, search by name includes"
                        }
                    ],
                    response: "https://gist.githubusercontent.com/y21/6d9fc80d8404867855e54367007a10e3/raw/4882627a2e9f94442a0d036c2c74cc473ccbd2c3/findUser.json"
                },
                {
                    name: "users",
                    http_method: [
                        "get"
                    ],
                    desc: "This endpoint returns an array of users in all rooms.",
                    format: "JSON",
                    parameters: [],
                    response: "https://gist.githubusercontent.com/y21/6d9fc80d8404867855e54367007a10e3/raw/9f2a591deda539b4bfa6e2b258242cfc426ab82f/users.json"
                },
                // Super Smash Bros Brawl
                {
                    name: "ssbb/amount",
                    http_method: [
                        "get"
                    ],
                    desc: "This endpoint returns the amount of players that has been connected to wiimmfi once with the game super smash bros brawl",
                    format: "JSON",
                    parameters: [],
                    response: "https://gist.githubusercontent.com/y21/6d9fc80d8404867855e54367007a10e3/raw/849d69718b7b14b4c814ec54a9d6311096bb52ec/ssbb_amount.json"
                },
                // Animal Crossing DS
                {
                    name: "acrossingds/amount",
                    http_method: [
                        "get"
                    ],
                    desc: "This endpoint returns the amount of players that has been connected to wiimmfi once with the game Animal Crossing using the console DS. (non-Japan version)",
                    format: "JSON",
                    parameters: [],
                    response: "https://gist.github.com/y21/6d9fc80d8404867855e54367007a10e3/raw/849d69718b7b14b4c814ec54a9d6311096bb52ec/acrossingds_amount.json"
                }
            ]
        }
    }
});
