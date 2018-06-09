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
                    date: "1st June 2018",
                    contents: [
                        "name can be passed as header and as a POST parameter now"
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
                    http_method: "get",
                    desc: "This endpoint returns the amount of available worldwides, continentals, privates, total worldwides, total continentals, total privates, total players and players in available rooms.",
                    format: "JSON",
                    parameters: [],
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/215a6276f3d77a7f6ff01721d0f3a945f7bb495d/amount-endpoint.json"
                },
                {
                    name: "regions",
                    http_method: "get",
                    desc: "This endpoint returns the amount of players logged in for each region which can be either CTGP, Jap/0, Ame/1 or Eur/2.",
                    format: "JSON",
                    parameters: [],
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/215a6276f3d77a7f6ff01721d0f3a945f7bb495d/regions-endpoint.json"
                },
                {
                    name: "findUser",
                    http_method: "get & post",
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
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/215a6276f3d77a7f6ff01721d0f3a945f7bb495d/findUser-endpoint.json"
                },
                {
                    name: "users",
                    http_method: "get",
                    desc: "This endpoint returns an array of users in all rooms.",
                    format: "JSON",
                    parameters: [],
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/215a6276f3d77a7f6ff01721d0f3a945f7bb495d/users-endpoint.json"
                },
                // Super Smash Bros Brawl
                {
                    name: "ssbb/amount",
                    http_method: "get",
                    desc: "This endpoint returns the amount of players that have been connected to wiimmfi once with the game super smash bros brawl",
                    format: "JSON",
                    parameters: [],
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/f187af6037a498f8a1f169484170a2bd4b50a453/ssbb-amount-endpoint.json"
                }
            ]
        }
    }
});
